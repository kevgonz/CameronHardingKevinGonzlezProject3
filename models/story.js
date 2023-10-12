const { DateTime } = require("luxon");
const stories = [
    {
        id: '1',
        title: 'A funny story',
        content: 'BlaBlaBlah',
        author: 'Cameron',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'Not funny',
        content: 'lablab',
        createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    }
];