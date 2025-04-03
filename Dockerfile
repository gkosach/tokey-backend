FROM ubuntu:latest
LABEL authors="drdev"

ENTRYPOINT ["top", "-b"]
