# TypeAid -- The Intelligent Assistive Typing Platform

TypeAid revolutionizes typing for individuals who face challenges with traditional keyboards. Our assistive typing platform and text editor provide a seamless and effortless typing experience, empowering users with accessibility needs to effortlessly express themselves.

## Important Links

| [Timesheet](https://1sfu-my.sharepoint.com/:x:/g/personal/hamarneh_sfu_ca/EdXmT3EDjcBEvJTaUMvAC-UB8svaVSuxkiQCcB5B_pV3Zw?e=NVgt7v) | [Slack channel](https://sfucmpt340spring2024.slack.com/canvas/C06DYV2093M) | [Project report](https://www.overleaf.com/project/65a57e44b93abb9b5d34e3cc) |
|-----------|---------------|-------------------------|

## Video/demo/GIF
Record a short video (1:40 - 2 minutes maximum) or gif or a simple screen recording or even using PowerPoint with audio or with text, showcasing your work.


## Table of Contents
1. [Repository](#demo)

2. [Installation](#installation)

3. [Reproducing this project](#repro)

4. [Guidance](#guide)


<a name="demo"></a>
## 1. Repository

### What to find where

Explain briefly what files are found where

```bash
repository
├── backend
│   ├── authentication
│   │   └── migrations
│   ├── backend
│   ├── predictive_text
│   │   ├── datasets
│   │   └── migrations
│   ├── textHandler
│   │   └── migrations
│   └── userpreferences
│       └── migrations
└── frontend
    ├── public
    │   └── assets
    │       └── images
    │           ├── png
    │           ├── shapes
    │           └── svg
    └── src
        ├── components
        ├── css
        ├── fonts
        │   └── poppins
        └── views
```

<a name="installation"></a>

## 2. Installation

To install, make sure to have Python, and Node JS installed onto the machine and run the following commands:

```bash
git clone $THISREPO
cd $THISREPO
```

Backend:
```bash
cd backend
pip3 install -r requirements.txt
```

Frontend:
```bash
cd frontend
npm install
```

<a name="repro"></a>
## 3. Start Application
To launch the application, start the backend and frontend server:

Frontend:
```bash
cd frontend
npm react-scripts start --host 0.0.0.0
```
Frontend:
```bash
cd backend
python3 manage.py migrate
python3 manage.py runserver
```


<a name="guide"></a>
## 4. Guidance

- Use [git](https://git-scm.com/book/en/v2)
    - Do NOT use history re-editing (rebase)
    - Commit messages should be informative:
        - No: 'this should fix it', 'bump' commit messages
        - Yes: 'Resolve invalid API call in updating X'
    - Do NOT include IDE folders (.idea), or hidden files. Update your .gitignore where needed.
    - Do NOT use the repository to upload data
- Use [VSCode](https://code.visualstudio.com/) or a similarly powerful IDE
- Use [Copilot for free](https://dev.to/twizelissa/how-to-enable-github-copilot-for-free-as-student-4kal)
- Sign up for [GitHub Education](https://education.github.com/) 
