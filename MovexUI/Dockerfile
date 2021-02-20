# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY Movex/*.csproj ./Movex/
COPY Movex.CrossCutting/*.csproj ./Movex.CrossCutting/
COPY Movex.Entity/*.csproj ./Movex.Entity/
COPY Movex.Services/*.csproj ./Movex.Services/
COPY Movex.Services.Test/*.csproj ./Movex.Services.Test/
RUN  dotnet restore

# copy everything else and build app
COPY Movex/. ./Movex/
COPY Movex.CrossCutting/. ./Movex.CrossCutting/
COPY Movex.Entity/. ./Movex.Entity/
COPY Movex.Services/. ./Movex.Services/
COPY Movex.Services.Test/. ./Movex.Services.Test/
WORKDIR /source/
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim
WORKDIR /app
EXPOSE 5000
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "Movex.dll"]