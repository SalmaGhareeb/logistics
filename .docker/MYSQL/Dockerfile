FROM mysql:5.7
ADD my.cnf /etc/mysql/conf.d/my.cnf
ADD init_db.sql /docker-entrypoint-initdb.d/init.db

ENV MYSQL_DATABASE=$MYSQL_DATABASE
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD


CMD ["mysqld"]
EXPOSE 3306