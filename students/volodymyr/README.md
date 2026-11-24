# Volodymyr DevOps Capstone API

Особистий проєкт для фінального практичного заняття з DevOps: REST API для керування задачами та моніторингу стану сервісу (`/` , `/health`, `/tasks`), упакований у Docker та розгорнутий за допомогою Terraform і GitHub Actions.

## Структура проєкту

```text
volodymyr/
├── .github/workflows/deploy.yml   # CI/CD пайплайн збірки, пушу образу та деплою
├── infra/                         # Конфігурація інфраструктури Terraform (SG + EC2)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── src/                           # Код Node.js застосунку
│   ├── package.json
│   └── server.js
├── Dockerfile                     # Оптимізована збірка образу на базі node:20-alpine
├── .dockerignore
├── .gitignore
└── README.md
```

## Локальний запуск

### 1. Запуск через Node.js
```bash
cd src
npm install
npm start
```
Перевірка в браузері або через запит:
- `http://localhost:3000/` — метадані сервісу та список ендпоінтів
- `http://localhost:3000/health` — стан роботи сервісу
- `http://localhost:3000/tasks` — перелік задач (`GET`) та створення нової (`POST`)

### 2. Запуск у Docker
```bash
docker build -t volodymyr-devops-notes-api .
docker run -d -p 3000:3000 --name volodymyr-app volodymyr-devops-notes-api
```
Зупинити й видалити тестовий контейнер:
```bash
docker rm -f volodymyr-app
```

## Змінні середовища та GitHub Secrets

### Змінні середовища застосунку
- `PORT` — порт запуску HTTP-сервера (за замовчуванням `3000`).
- `APP_ENV` — середовище виконання (`development`, `production` тощо; за замовчуванням `development`).

### Секрети у GitHub Actions (`Settings -> Secrets and variables -> Actions`)
- `DOCKER_USERNAME` — логін облікового запису Docker Hub.
- `DOCKER_TOKEN` — Access Token для авторизації в Docker Hub.
- `AWS_ACCESS_KEY_ID` — ключ доступу AWS для роботи Terraform.
- `AWS_SECRET_ACCESS_KEY` — секретний ключ AWS для роботи Terraform.
- `EC2_SSH_KEY_B64` — приватний SSH-ключ для підключення до EC2, закодований у Base64.

## Інфраструктура (Terraform)

У директорії `infra/` описуються:
- **Security Group** з відкритими портами `22` (SSH) та `3000` (порт застосунку);
- **EC2 інстанс** (Ubuntu) із автоматичним встановленням та запуском Docker через `user_data`;
- **Outputs** (`instance_id`, `instance_public_ip`).

Базові команди в `infra/`:
```bash
terraform init
terraform plan
terraform apply
```

Для видалення створених у хмарі ресурсів після завершення роботи:
```bash
terraform destroy
```

## Як працює CI/CD пайплайн

1. При пуші у гілку `main` (або ручному запуску) стартує workflow у `.github/workflows/deploy.yml`.
2. Terraform виконує `init`, `plan` та `apply` для створення/оновлення інфраструктури й повертає публічну IP-адресу EC2.
3. GitHub Actions виконує вхід у Docker Hub, збирає образ із `students/volodymyr/Dockerfile` та пушить його під тегами `:latest` і `:<commit-sha>`.
4. Через SSH за ключем `EC2_SSH_KEY_B64` пайплайн підключається до EC2, завантажує свіжий образ і перезапускає контейнер `volodymyr-app` на порту `3000`.