# Yandex Geocoding App

## Описание

Это приложение предназначено для работы с [Yandex Geocode API](https://yandex.ru/dev/geocode/doc/ru/).

Приложение позволяет получать координаты адресов и сохранять их в файл формата xlsx.

## Использование

1. **Получение API ключа:**
    - Получите API ключ на [Yandex Developer Dashboard](https://developer.tech.yandex.ru/services/). Необходимо создать проект и получить ключ для Geocoding API.

2. **Установка и запуск:**
    - Склонируйте репозиторий: `git clone <URL репозитория>`
    - Перейдите в папку проекта: `cd yandex-geocoding-app`
    - Установите зависимости: `npm install`
    - Запустите приложение: `npm run dev`

3. **Использование приложения:**
    - Заполните поле `ApiKey` с полученным API ключом.
    - Введите адреса в поле `Addresses`. Каждый адрес должен быть на отдельной строке.
    - Нажмите кнопку `Get coordinates` для получения координат.
    - Результаты будут сохранены в файл формата xlsx.

## Ограничения
- Количество обработанных адресов ограничено вашим API ключом (по умолчанию 1000).
- Между запросами существует пауза в 1 секунду, чтобы избежать блокировки.

## Заметки
- Перед использованием приложения убедитесь, что у вас есть действующий API ключ от Yandex Geocode API.
- Для успешного выполнения операции у вас должно быть доступное интернет-соединение.

