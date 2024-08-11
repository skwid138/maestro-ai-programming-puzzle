FROM node:lts

WORKDIR /app

COPY docker-algorithms/ .
COPY data/ .

# By default, run the DFS script
CMD ["node", "dfs.js"]