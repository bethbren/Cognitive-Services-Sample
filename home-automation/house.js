// House API
const house = (() => {
    const room = {
        bedroom: "bedroom",
        kitchen: "kitchen",
        livingRoom: "livingroom", // SVG selectors can't have spaces
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
        // Normalize the entities coming from LUIS by matching them with "synonyms"
        const matchedRoom = (() => {
            switch (selectedRoom) {
                case "bed room":
                    return room.bedroom;
                case "living room":
                    return room.livingRoom;
                default:
                    return selectedRoom;
            }
        })();

        const matchedDevice = (() => {
            switch (selectedDevice) {
                case "light":
                    return device.lights;
                case "stereo":
                    return device.radio;
                case "television":
                    return device.tv;
                default:
                    return selectedDevice;
            }
        })();

        if (!devicesInRooms[matchedRoom]) {
            alert(`[Error] The house does not have a room called the "${selectedRoom}"`);
            return;
        }

        const deviceInRoom = devicesInRooms[matchedRoom].includes(matchedDevice);

        if (deviceInRoom) {
            const selector = "." + matchedRoom + "." + matchedDevice;
            if (selectedState === device.state.on) {
                if (matchedDevice === device.lights) {
                    house.find(selector).attr("fill", "yellow");
                } else if (matchedDevice === device.tv || matchedDevice === device.computer) {
                    house.find(selector).attr("fill", "blue");
                } else {
                    house.find(selector).attr("stroke", "red");
                }
            } else {
                if (matchedDevice === device.radio || matchedDevice === device.oven) {
                    house.find(selector).attr("stroke", "black");
                }
                house.find(selector).attr("fill", "white");
            }
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
