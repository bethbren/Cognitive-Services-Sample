// House API
const house = (() => {
    const room = {
        bedroom: "bedroom",
        kitchen: "kitchen",
        livingRoom: "living room",
        office: "office"
    };

    const device = {
        radio: "radio",
        computer: "computer",
        light: "light",
        oven: "oven",
        tv: "tv",
        state: {
            on: "on",
            off: "off"
        }
    };

    const devicesInRooms = {
        [room.bedroom]: [device.light, device.radio],
        [room.kitchen]: [device.light, device.oven],
        [room.livingRoom]: [device.light, device.tv],
        [room.office]: [device.light, device.computer]
    };

    function command(house, room, device, state) {
        const deviceInRoom = devicesInRooms[room].includes(device);

        if (deviceInRoom) {
            // TODO pass the house DOM object as the `house` parameter
            // TODO set device state if it is in the room
        } else {
            alert(`[Error] The ${room} does not have a ${device}!`)
        }
    }

    return {
        room: room,
        device: device,
        command: command
    };
})();
