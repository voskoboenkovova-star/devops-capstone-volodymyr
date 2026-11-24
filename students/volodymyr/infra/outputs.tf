output "instance_id" {
  description = "ID створеного EC2 інстансу"
  value       = aws_instance.app_server.id
}

output "instance_public_ip" {
  description = "Публічна IP-адреса EC2 сервера"
  value       = aws_instance.app_server.public_ip
}