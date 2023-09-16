import logging
import os
import random
import time
import uuid
from argparse import ArgumentParser, RawTextHelpFormatter

import psycopg
from psycopg.errors import SerializationFailure, Error
from psycopg.rows import namedtuple_row

def print_conn(conn):
    print("conn", conn)
    with conn.cursor() as cur:
        cur.execute("SELECT * FROM rooms")
        rows = cur.fetchall()
        for row in rows:
            print(row)

def add_block(conn, block_id, block_name, room_id):

    with conn.cursor() as cur:

        # check if any blocks exist for this room
        cur.execute("SELECT * FROM block WHERE rowid = %s", (room_id,))
        rows = cur.fetchall()
        data = ""
        isRoot = True

        print("rows", rows)
        if len(rows) > 0:
            cur.execute("SELECT data FROM block WHERE id = %s", (block_id))
            data = cur.fetchone()[0]
            print("data", data)
            isRoot = False
        
        # Create block
        cur.execute("INSERT INTO block (parent, label, data) VALUES (%s, %s, %s)", (block_id, block_name, data))
        print("added block:", block_id, block_name)

        # get id of new block
        cur.execute("SELECT rowid FROM block WHERE parent = %s AND label = %s", (block_id, block_name))
        new_block_id = cur.fetchone()[0]
        print("block_id", new_block_id)

        if len(rows) > 0 and isRoot == False:
            # Add edge to rooms db, and root id to rooms db
            # create tuple of edges
            edge = (block_id, new_block_id)
            print("edge", edge)

            # add edge to rooms db 
            cur.execute("UPDATE rooms SET edges = edges || %s WHERE rowid = %s", (str(edge), room_id))
            print("added edge to rooms db")
        
        if isRoot:
            # Add root id to rooms db
            cur.execute("UPDATE rooms SET root_block_id = %s WHERE rowid = %s", (new_block_id, room_id))
            print("added root to rooms db")

def main():
    opt = parse_cmdline()
    logging.basicConfig(level=logging.DEBUG if opt.verbose else logging.INFO)
    try:
        # Attempt to connect to cluster with connection string provided to
        # script. By default, this script uses the value saved to the
        # DATABASE_URL environment variable.
        # For information on supported connection string formats, see
        # https://www.cockroachlabs.com/docs/stable/connect-to-the-database.html.
        db_url = opt.dsn
        print("url", db_url)
        conn = psycopg.connect(db_url, 
                               application_name="$ docs_simplecrud_psycopg3", 
                               row_factory=namedtuple_row)
        
        # add_block(conn, -1, "block 1", 1);
    
        print_conn(conn)

    except Exception as e:
        logging.fatal("database connection failed")
        logging.fatal(e)
        # rollback
        conn.rollback()
        return

def parse_cmdline():
    parser = ArgumentParser(description=__doc__,
                            formatter_class=RawTextHelpFormatter)

    parser.add_argument("-v", "--verbose",
                        action="store_true", help="print debug info")

    parser.add_argument(
        "dsn",
        default=os.environ.get("DATABASE_URL"),
        nargs="?",
        help="""\
database connection string\
 (default: value of the DATABASE_URL environment variable)
            """,
    )

    opt = parser.parse_args()
    if opt.dsn is None:
        parser.error("database connection string not set")
    return opt


if __name__ == "__main__":
    main()