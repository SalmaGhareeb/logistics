FROM node:latest

# Good to have stuff
RUN npm install babel-cli -g

# Install app dependencies
COPY package.json www/package.json
RUN cd www/ && npm install

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www
# set your port
ENV PORT 3000
# Entrypoint script
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh
# expose the port to outside world
EXPOSE  3000
# start command as per package.json
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]