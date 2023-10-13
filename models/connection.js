const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const connections = [
    {
        id: '1',
        title: 'Soccer Pickup',
        sport: 'Soccer',
        catagory: '1',
        host: 'Kevin',
        contact: '123-145-6789',
        details: 'BlaBlaBlah',
        where: 'Strikers Complex',
        when: '10/13/2023',
        start: '7:00 PM',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'Rocket League Scrim',
        sport: 'Rocket League',
        catagory: '2',
        host: 'Cameron',
        contact: '123-145-6539',
        details: 'BlaBlaBlah',
        where: 'Discord',
        when: '10/13/2023',
        start: '11:00 PM',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        title: 'Flag-Football Pickup',
        sport: 'Flag-Football',
        catagory: '1',
        host: 'Cameron',
        contact: '123-145-6539',
        details: 'BlaBlaBlah',
        where: 'North Rec Feilds',
        when: '10/13/2023',
        start: '7:00 PM',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '4',
        title: 'Volleyball Pickup',
        sport: 'Volleyball',
        catagory: '1',
        host: 'Cameron',
        contact: '123-145-6539',
        details: 'BlaBlaBlah',
        where: 'Belk Gym',
        when: '10/13/2023',
        start: '7:00 PM',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '5',
        title: 'Valorant Scrim',
        sport: 'Valorant',
        catagory: '2',
        host: 'Cameron',
        contact: '123-145-6539',
        details: 'BlaBlaBlah',
        where: 'Discord',
        when: '10/13/2023',
        start: '11:00 PM',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '6',
        title: 'League of Legends Scrim',
        sport: 'League of Legends',
        catagory: '2',
        host: 'Cameron',
        contact: '123-145-6539',
        details: 'BlaBlaBlah',
        where: 'Discord',
        when: '10/13/2023',
        start: '11:00 PM',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.find = () => connections;
exports.findById  = id =>  connections.find(connection => connection.id === id);

exports.save = function(connection) {
    connection.id = uuidv4();
    connection.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    connections.push(connection);
};

exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection => connection.id === id);
    if(connection){
        connection.title = newConnection.title;
        connection.content = newConnection.content;
        return true; 
    }else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = connections.findIndex(connection => connection.id === id);
    if(index !== -1){
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}