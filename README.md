<div align="center">
<img src="https://user-images.githubusercontent.com/47891196/139104117-aa9c2943-37da-4534-a584-e4e5ff5bf69a.png" width="350px" />
</div>

# Teste de pipeline no GitHub Actions via IA

# CI/CD Pipeline com Minikube e GitHub Actions

Este projeto demonstra como configurar um pipeline de Integração Contínua (CI) e Entrega Contínua (CD) usando GitHub Actions para buildar uma aplicação Node.js, publicar a imagem no GitHub Container Registry e aplicar os manifests em um cluster Minikube local via runner self-hosted.

📂 Estrutura do Repositório

```
Pipeline/
├── .github/
│   └── workflows/
│       └── ci-cd.yaml        # Arquivo principal do pipeline
├── k8s/
│   ├── deployment.yaml       # Manifesto de Deployment
│   └── service.yaml          # Manifesto de Service
├── package.json              # Configuração do projeto Node.js
├── README.md                 # Documentação detalhada
└── src/                      # Código fonte da aplicação
```

🚀 Passo a Passo

1. Criar aplicação Node.js

Inicialize o projeto:

```
npm init -y
```

2. Configurar Minikube

Instale Minikube e kubectl.

Inicie o cluster:

```
minikube start --nodes 4
```

Verifique os nós:

```
kubectl get nodes
```

3. Gerar kubeconfig

Extraia o kubeconfig do Minikube:

```
kubectl config view --minify --context=minikube --flatten > kubeconfig.yaml
```

4. Configurar GitHub Secrets

Vá em Settings → Secrets and variables → Actions → New repository secret.

Crie:

GHCR_PIPELINE_TOKEN → token para publicar imagens no GitHub Container Registry.

KUBECONFIG → conteúdo do kubeconfig.yaml.

5. Instalar Runner Self-Hosted

Baixe o runner:

```
mkdir ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v2.334.0/actions-runner-linux-x64-2.334.0.tar.gz
tar xzf actions-runner-linux-x64.tar.gz
```

Configure:

```
./config.sh --url https://github.com/orbite82/Pipeline --token SEU_TOKEN
```

Inicie:

```
./run.sh
```

Instale como serviço:

```
sudo ./svc.sh install
sudo ./svc.sh start
```

6. Configurar Workflow (ci-cd.yaml)

Build job (roda na nuvem):

Checkout do código.

Instala dependências.

Roda testes.

Builda e publica imagem Docker no GHCR.

Deploy jobs (rodam no runner self-hosted):

Configuram kubectl.

Escrevem o kubeconfig no local padrão.

Garantem que o namespace existe.

Aplicam os manifests (deployment.yaml e service.yaml).

7. Testar Pipeline

Faça commit e push:

```
git add .
git commit -m "Configura CI/CD com runner self-hosted"
git push origin dev
```

Vá em Actions → veja o workflow rodando.

O build roda em ubuntu-latest.

O deploy roda em self-hosted (sua máquina).

Verifique os pods:

```
kubectl get pods -n dev-study
```

✅ Resultado

Build automatizado na nuvem.

Deploy automatizado no Minikube local via runner self-hosted.

Pipeline completo de CI/CD funcionando.