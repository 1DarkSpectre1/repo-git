# Спецификация проекта “Task Manager”
##Цель
Разработка системы для мониторинга выполнения задачи сотрудником с возможностью добавления задач и сотрудников.
##Описание
Task manager – это инструмент, который позволяет следить за выполнением задач.
##Функциональные возможности
1. Учет проектов
	1. Создание проекта
	2. Редактирование проекта
	3. Удаление проекта
2. Учет задач
	1. Просмотр задач выбранного  проекта
	2. Просмотр завершённых задач
	3. Создание задачи
	4. Редактирование задачи
	5. Удаление задачи
3. Учет сотрудников
	1. Создание сотрудника
	2. Редактирование сотрудника
	3. Удаление сотрудника
4. Учет статуса задачи
	1. Просмотр списка задач с её статусом 
5. Логика статуса задачи
	1. Изменение статуса в зависимости от того назначен сотрудник или нет
	2. Изменение статуса задачи в зависимости от действий принятых к этой задаче
6. Авторизация

##Используемые технологии

| Технология    | Версия    |
|---------------|-----------|
| GO            | 1.15      |
| Revel         | 1.0.0     |
| PostgreSQL    | 12        |
| Webix         | 5.3.0     |