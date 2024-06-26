# PrometheusDevOpsHackaton
Prometheus DevOps Hackathon Repo for "Too old for this shit" team
------------

Мета: Метою цього завдання є створення бота для Slack, який може автоматично розгортати та керувати preview environment - середовищами попереднього перегляду для команд розробників. Бот повинен вміти отримувати команди від Slack, створювати нові середовища на основі отриманої команди та надавати розробнику зворотній зв'язок про стан його середовища попереднього перегляду.

Завдання: Як розробник я хочу мати можливість підключити Slack-бота до каналу команди для управління середовищами попереднього перегляду на інфраструктурі. Нам необїідна підтримка унікального набору версій додатку та супутнього оточення, наприклад, бази даних. Бот повинен надавати функції create, get, delete для розгортання, отримання актуального статусу та унікального посилання, а також видалення середовища.

------------
##### Задачі:

###### 1. Розробка Slack-бота

Розробити Slack бота, який буде підключатися до каналу команди та взаємодіяти з користувачами. Інтерфейс мессенджера дозволяє користувачам запускати процеси створення, перевіряти статус середовища, отримувати унікальне посилання та безпечно видаляти середовище. Бот повинен мати можливість приймати команди create, get, delete від користувачів та надавати відповіді згідно вимог.

###### 2. Інтеграція з системою управління версіями

Налаштувати інтеграцію Slack бота з системою управління версіями додатків. Забезпечити можливість отримання актуального статусу версій аплікації на різних середовищах:

2.1. Команда create

Реалізувати команду create, яка дозволить користувачу створити середовища для відповідної версії додатку, включаючи необхідні супутні сервіси. Бот повинен розгортати середовище, надавати інформацію про версії розгорнутого набору аплікацій та вартість інфраструктури, яка додатково може бути розгорнута.

2.2. Команда get

Реалізувати команду get, яка дозволить користувачу отримати перелік середовищ та версій розгорнутого набору аплікацій та їх статус. Бот повинен повертати унікальне URL посилання на фронтенд версії аплікації.

2.3. Команда delete

Реалізувати команду delete, яка дозволить користувачу безпечно виконати видалення середовища після демонстрації. Бот повинен виконати необхідні дії для видалення як аплікації так і інфраструктури і підтвердити успішне виконання операції.

###### 3. [Документація ADR (Архітектурні рішення)](./docs/ADR/index.md)

Розробити документацію ADR (Архітектурні рішення) для Slack-бота. Визначити ключові архітектурні рішення, використовувані технології та підходи, а також описати причини прийняття цих рішень.

###### 4. [Високорівневий дизайн (HLD)](./docs/HLD/index.md)

Розробити високорівневий дизайн (HLD — High-Level Design) для Slack-бота. Визначити загальну архітектуру системи, основні компоненти, взаємодію між ними та основні функціональні можливості. 

###### 5. [Документація користувача](./integrationBot/README.md)

Розробити документацію користувача для Slack-бота.
