// House API
const house = (() => {
    const room = {
        bedroom: "bedroom",
        kitchen: "kitchen",
        livingRoom: "livingroom",
        office: "office"
    };

    const device = {
        radio: "radio",
        computer: "computer",
        lights: "lights",
        oven: "oven",
        tv: "tv",
        state: {
            on: "on",
            off: "off"
        }
    };

    const devicesInRooms = {
        [room.bedroom]: [device.lights, device.radio],
        [room.kitchen]: [device.lights, device.oven],
        [room.livingRoom]: [device.lights, device.tv],
        [room.office]: [device.lights, device.computer]
    };

    function command(house, selectedRoom, selectedDevice, selectedState) {
        if (!devicesInRooms[selectedRoom]) {
            alert(`[Error] The house does not have a room called the "${selectedRoom}"`);
            return;
        }

        const deviceInRoom = devicesInRooms[selectedRoom].includes(selectedDevice);

        if (deviceInRoom) {
            // TODO pass the house DOM object as the `house` parameter
            // TODO set device state if it is in the room
            const selector = "." + selectedRoom + "." + selectedDevice;
            if(selectedState == device.state.on) {
                if (selectedDevice == device.lights) {
                    house.find(selector).attr("fill", "yellow");
                }
                else if (selectedDevice == device.tv || selectedDevice == device.computer) {
                    house.find(selector).attr("fill", "blue");
                }
                else {
                    house.find(selector).attr("stroke", "red");
                }
            } else {
                if(selectedDevice == device.radio || selectedDevice == device.oven) {
                    house.find(selector).attr("stroke", "black");
                }
                house.find(selector).attr("fill", "white");
            }
            alert(`Got it: turn ${selectedState} the ${selectedDevice} in the ${selectedRoom}`);
        } else {
            alert(`[Error] The ${selectedRoom} does not have a ${selectedDevice}!`)
        }
    }

    return {
        room: room,
        device: device,
        command: command
    };
})();
