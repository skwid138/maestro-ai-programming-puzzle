FROM node:lts

WORKDIR /app

COPY . .

# By default, run the DFS script
CMD ["npm", "run", "start:dfs"]