variable "aws_region" {
  description = "AWS регіон для розгортання"
  type        = string
  default     = "eu-central-1"
}

variable "instance_type" {
  description = "Тип інстансу EC2"
  type        = string
  default     = "t2.micro"
}

variable "app_port" {
  description = "Порт застосунку"
  type        = number
  default     = 3000
}

variable "key_name" {
  description = "Назва SSH-ключової пари в AWS"
  type        = string
  default     = "devops-capstone-key"
}

variable "use_localstack" {
  description = "Використовувати локальний емулятор (MiniStack/LocalStack) замість реального AWS"
  type        = bool
  default     = false
}