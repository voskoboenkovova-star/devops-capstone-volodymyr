# DevOps Capstone Project — Volodymyr

Індивідуальний підсумковий проєкт із курсу **System Administration and DevOps Technologies**, створений на базі шаблону `Max-K44/devops-template`.

## Розташування проєкту

Усі файли застосунку, конфігурація інфраструктури, CI/CD пайплайн та детальна документація розміщені у директорії:
- [`students/volodymyr/`](./students/volodymyr/) — основна папка проєкту та детальний [`README.md`](./students/volodymyr/README.md)

## Стек та інструменти

- **Backend:** Node.js (Express REST API: `/`, `/health`, `/tasks`)
- **Контейнеризація:** Docker (оптимізований образ на базі `node:20-alpine`)
- **IaC:** Terraform (AWS Security Group + EC2 з автоустановкою Docker)
- **CI/CD:** GitHub Actions (автоматична збірка, публікація в Docker Hub та деплой на EC2)
