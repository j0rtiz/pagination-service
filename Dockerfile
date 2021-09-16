FROM node:14-alpine as build

ARG ENVIRONMENT
ARG IMAGE_BASE_NAME
ARG DOCKER_TAG_PREFIX

ENV SONAR_SCANNER_VERSION=4.6.0.2311
ENV JAVA_HOME=/usr/lib/jvm/java-1.8-openjdk/jre
ENV SONAR_SCANNER_OPTS="-Xmx512m -Dsonar.host.url=https://sonarqube.digital.homeoffice.gov.uk/"
ENV PATH $PATH:/sonar-scanner/bin:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

ADD "https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip" /

RUN if [ "$DOCKER_TAG_PREFIX" != "0" ] ; then set -x \
    && apk add --no-cache unzip openjdk8-jre \
    && unzip sonar-scanner-cli-${SONAR_SCANNER_VERSION}.zip \
    && ln -s /sonar-scanner-${SONAR_SCANNER_VERSION} /sonar-scanner \
    && rm -f sonar-scanner-cli-*.zip ; fi

WORKDIR /app
COPY . ./

RUN if [ "$DOCKER_TAG_PREFIX" != "0" ] ; then /sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=${IMAGE_BASE_NAME} -Dsonar.sources=. -Dsonar.host.url=http://10.253.94.14 -Dsonar.login=e12f3369ef0cd7bdae3b1c6b10f7f37e3466a905 ; fi
RUN yarn audit --level info
RUN yarn add \
    yarn run prune && \
    yarn cache clean
RUN yarn test:unit

FROM node:14-alpine

WORKDIR /app
COPY --from=build /app /app

ENV NODE_PATH=.
ENV NODE_ENV=${ENVIRONMENT}
ENV APP_PORT=3000

EXPOSE 3000

CMD [ "yarn", "start" ]
