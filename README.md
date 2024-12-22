# Next.js Project with Docker

This project is set up to work with Docker, simplifying the installation and execution process. Below are the instructions to quickly start the application.

## Prerequisites

- **Docker Desktop**: Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop).

  Make sure to keep it open while working on this project, as it provides the necessary tools for running Docker containers.

- **Access to a terminal**: Any terminal compatible with Docker, such as your operating system terminal or an IDE like Visual Studio Code.

## Instructions to Start the Project

1. **Clone the repository** (if you haven’t already):

   ```bash
   git clone <REPOSITORY_URL>
   cd <REPOSITORY_NAME>
   ```

2. **Build and run the application**:

   In the root of the project, execute the following command:

   ```bash
   docker-compose up --build
   ```

   This command:

   - Builds the required Docker images.
   - Installs all project dependencies.
   - Starts the application.

3. **Access the application**:

   Once the process is complete, open your browser and go to:

   ```url
   http://localhost:3000
   ```

   Here, you can see the application running locally on your machine.

## Visualizing Graphs Generated with Python

To visualize a graph generated with Python using Plotly, you need to print the graph's JSON to the console. Below is a code example:

```python
import plotly.graph_objects as go

x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]
fig = go.Figure(data=go.Scatter(x=x, y=y, mode='lines+markers'))

fig_json = fig.to_json()

print(fig_json)
```

This approach ensures you can transfer the graph data to the frontend application for rendering.

## Additional Notes

- If you need to stop the application, use the `Ctrl + C` shortcut in the terminal where Docker Compose is running.
- To remove the created containers, you can execute:

  ```bash
  docker-compose down
  ```

- If you make changes to the source code, you can rebuild and run the application using the `docker-compose up --build` command to ensure the changes are reflected correctly.

Enjoy developing! 🚀

```

```
