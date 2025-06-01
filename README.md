# Zadanie1
## Część obowiązkowa
### 1.Budowanie obrazu kontenera: 
```bash
docker build -f Dockerfile -t web:v1 .
```
![1](img/1.png)
### 2.Uruchomienie kontenera: 
```bash
docker run -d -p 4567:4567 --name zadanie web:v1
```
### 3.Informacje z logów uruchomieniowych: 
```bash
docker exec -it zadanie cat log_startu.txt
```
### 4.Liczba warstw i rozmiar obrazu: 
```bash
docker image inspect web:v1 --format='Liczba warstw: {{len .RootFS.Layers}}' 
docker image inspect web:v1 --format='Rozmiar obrazu: {{.Size}} bajtów'
```
![2](img/2.png)
### 5.Działanie aplikacji
![3](img/3.png)
### 6.Link do DockerHub
(https://hub.docker.com/repository/docker/jdrew589/zadanie1_jd/general)
# Zadanie 2
### Główne kroki:
1. **Login do GHCR (GitHub Container Registry)**
2. **Login do DockerHub** (dla cache)
3. **Budowanie wieloarchitekturne (`linux/amd64`, `linux/arm64`)**
4. **Wykorzystanie cache z DockerHub (eksporter i backend registry)**  
5. **Skanowanie obrazu za pomocą [Trivy](https://aquasecurity.github.io/trivy/)**  
   - Obraz NIE zostanie wypchnięty, jeśli wykryto podatności `CRITICAL` lub `HIGH`
6. **Push do GHCR (tylko jeśli skan przeszedł)**
### Secrets
- DOCKERHUB_USERNAME – Twój login do DockerHub
- DOCKERHUB_TOKEN – token dostępu DockerHub
- GITHUB_TOKEN – jest dostępny automatycznie
### Obrazy tagowane są w formacie:
ghcr.io/jd92910/pogoda-app:4ce31b08cc1f890dc8851b6f727102cd5678dd4e
### Cache jest przechowywany jako obraz na DockerHub w repozytorium:
https://hub.docker.com/repository/docker/jdrew3081/pogoda-app-cache
### Cache eksportowany i pobierany jest z użyciem:
- `type=registry`
- `mode=max`
Umożliwia to wydajne, wieloarchitekturne buildy z minimalnym przebudowywaniem warstw.
