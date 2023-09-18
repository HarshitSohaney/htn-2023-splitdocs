# Jamscribe

An experiment in real-time iterative doc editing.
Built at Hack The North 2023.


## Getting started
You must have ```npm``` installed to install and run the program

clone the repo
``` git clone https://github.com/HarshitSohaney/htn-2023-splitdocs.git ```

run the following commands
```
cd htn-2023-splitdocs
npm install
npm run dev
```

## Enjoy your next document editor!
<p align="center">
<img width="1351" alt="image" src="https://github.com/HarshitSohaney/htn-2023-splitdocs/assets/73911621/1b6f6489-68e2-4bd8-96d4-690d9cb5718e">
</p>

## Inspiration
The project is a culmination of version control (Git), design software (Figma) and document editing (Notion, Google Docs). It was inspired by an understanding of a few common pain points team members have faced:
1. Losing information about previous iterations of a file in a linear version control structure (Google Docs).
2. File cluttering with drafts, versions of similar documents (resumes, essays, research papers), leading to unorganized and difficult to manage files along with less room for smooth ideation from previous work.

## What it does
JamScribe provides a new approach to version history and document editing. For users familiar with Git, the platform offers 4 features:
1. **Branch** - create a copy of the current document into a new document that acts as a child. Users can make any edits to this new document without disturbing the original document, and can create as many branches as they want. This feature helps users keep different versions of a document that stem from the same base writing. A great example of this is having multiple resumes for different jobs such as Software, ML, Data Science etc.
2. **Merge** - merge two or more documents to create a new document. This feature helps users combine their work with other documents around in the tree, allowing them to merge different documents into one. This feature can be used in situations where users work on different sections in different branches, leading to a merge at the end. This is dealt with conflict resolution techniques (such as those seen in VSCode) and AI integration (future work where an AI can judge how best to combine documents).
3. **Cohere AI Autocomplete** - A major part of ideation today includes running ideas by an LLM model. Our prompt option allows users to expand of written work using the NLP model provided by Cohere, which can answer questions, and auto complete versions of the document. These autocompletions are new branches that stem from the point of request.


## How we built it
We built the application using Typescript and Python, and used dependencies Novel.sh and ReactFlow to create an infinite platform to design on. We created a new workflow for editing and writing documents using the branch merge model inspired by version control.


## Challenges we ran into
   - Navigating around new technologies (Slower ramp up time).
   - We had to switch to a different text editing library so we needed to quickly adapt our codebase.
   - Deciding on a UX workflow for a new form of document editing.


## Accomplishments that we're proud of
  - Designing a brand new workflow for document editing, re-imagining how people write and document. 
  - Creating an MVP from scratch.
  - Engineering an application that addresses a gap in the current architecture of text editing software today.
  - Communicating well throughout the entire design process, from idea generation to prototyping, everyone was on the same page.


## What we learned
   - Teamwork makes the dream work.


## What's next for JamScribe
   - Interactive merging with AI grammar checks and various other parameters
   - AI tags to alter style of writing.
   - Support collaborative development over parallel branches simultaneously.
   - Integrate current document styles to be imported into JamScribe.
