## Getting Started

Follow the instructions below to set up the backend on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed:

- Python (3.11 or newer)
- pip (Python package installer)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/sfu-cmpt340/TypeAid.git
```

2. Navigate to the backend directory:

```bash
cd TypeAid/backend
```

3. Create a virtual environment (recommended):

```bash
python -m venv env
.\env\Scripts\activate
```

Note: If for some reason you cannot create the virtual environment, then please proceed to next step and ignore this step.

4. Install project dependencies:

```bash
pip install -r requirements.txt
```

5. Set up the database:

```bash
python manage.py migrate
```

6. Start the development server:

```bash
python manage.py runserver
```

This will launch the project in your default web browser at http://localhost:8000.
