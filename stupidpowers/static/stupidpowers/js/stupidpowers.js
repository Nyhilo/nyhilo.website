(() => {
    Array.prototype.choose = function () {
        return this[Math.floor((Math.random() * this.length))];
    }

    //    { power: "Lactomancy", ruling: "" },
    const powers = [
        { power: "Lactomancy", ruling: "" },
        { power: "The ability to levitate small fires towards yourself", ruling: "" },
        { power: "The ability to tell if another person has a super power", ruling: "" },
        { power: "You can speak to plants. You are also a vegetarian", ruling: "" },
        { power: "You can turn to stone. Can't move though", ruling: "" },
        { power: "You can pluck a toothpick out of thin air", ruling: "" },
        { power: "The ability to smell the past", ruling: "" },
        { power: "The ability to summon background dancers that go away as soon as you stop dancing/singing", ruling: "" },
        { power: "Super-jump up to d6 * 10 feet.", ruling: "" },
        { power: "You always know exactly what time it is", ruling: "" },
        { power: "Giant pet slug. Must be kept moist.", ruling: "" },
        { power: "Can teleport other people in the same room through walls", ruling: "" },
        { power: "Squirrel Person", ruling: "" },
        { power: "The Clapper. You can clap your hands to turn on/off nearby electronic devices.", ruling: "" },
        { power: "You can absorb anger", ruling: "" },
        { power: "You are forgotten moments after you are out of sight", ruling: "" },
        { power: "You sparkle", ruling: "" },
        { power: "You can decrease or increase your size by about 10%", ruling: "" },
        { power: "You have really cool sunglasses. Also you emanate a sick beat wherever you go", ruling: "" },
        { power: "You have a 30% of getting right any question you are asked", ruling: "" },
        { power: "Insect Necromancy", ruling: "" },
        { power: "Every time you blink, you teleport wherever you are looking (looking at the sky is safe)", ruling: "" },
        { power: "You are Betty Crocker", ruling: "" },
        { power: "+1 Luck", ruling: "" },
        { power: "You can adjust other people's volumes", ruling: "" },
        { power: "You can remove your limbs and reattach them", ruling: "" },
        { power: "You can tell when someone is thinking of you", ruling: "" },
        { power: "You have the ability to be mistaken for any nationality of your choice", ruling: "" },
        { power: "The ability to do anything you set your mind to, but only if nobody is watching", ruling: "" },
        { power: "Various plants sprout from your body", ruling: "" },
        { power: "Your drunkenness is contagious", ruling: "" },
        { power: "You can turn any vehicle into any other vehicle of the same type", ruling: "" },
        { power: "Spraycan fingers", ruling: "" },
        { power: "You have eyes in the palms of your hands", ruling: "" },
        { power: "Shape-shifting plastic head", ruling: "" },
        { power: "Explosive claps", ruling: "" },
        { power: "That ability to rearrange your organs", ruling: "" },
        { power: "Acid sweat", ruling: "" },
        { power: "Chloroform Breath", ruling: "" },
        { power: "You can turn into a ball and roll around", ruling: "" },
        { power: "You can summon a miniature version of yourself", ruling: "" },
        { power: "Sliding", ruling: "" },
        { power: "You can float by inflating like a balloon", ruling: "" },
        { power: "Stench generation", ruling: "" },
        { power: "You can make people sneeze", ruling: "" },
        { power: "Appendage generation", ruling: "" },
        { power: "Fluency in all languages", ruling: "" },
        { power: "That ability to vomit clean, potable water", ruling: "" },
        { power: "Bubble Beam!", ruling: "" },
        { power: "That ability to refill things", ruling: "" },
        { power: "That ability to change your weight without changing your size", ruling: "" },
        { power: "That ability to turn small objects into gravy", ruling: "" },
        { power: "Chicken powers", ruling: "" },
        { power: "Lord of the Flies", ruling: "" },
        { power: "You can fly indoors", ruling: "" },
        { power: "You are covered in glitter, and it gets everywhere", ruling: "" },
        { power: "You experience life in the third person", ruling: "" },
        { power: "You can change the color of any part of your body", ruling: "" },
        { power: "You can turn invisible while you're eyes are closed", ruling: "" },
        { power: "You switch genders every time you sneeze", ruling: "" },
        { power: "You can summon uncooked spaghetti", ruling: "" },
        { power: "You can create the sound of an entire theater's worth of applause with only your two hands", ruling: "" },
        { power: "Can shapeshift into anything with the letter Q in its name", ruling: "" },
        { power: "You are a voodoo doll", ruling: "" },
        { power: "Perfect Voice Acting", ruling: "" },
        { power: "You can summon guy Fieri", ruling: "" },
        { power: "BB gun fingers", ruling: "" },
        { power: "You bark when you sense danger", ruling: "" },
        { power: "Walls are invisible to you", ruling: "" },
        { power: "You can turn weapons into their Nerf equivalent", ruling: "" },
        { power: "When you close your eyes, everyone within 50ft also close their eyes", ruling: "" },
        { power: "Toy pokeballs work like real pokeballs for you.", ruling: "" },
        { power: "You can liquify clothing", ruling: "" },
        { power: "You are a wifi hotspot", ruling: "" },
        { power: "You can move the locations of the hair follicles on your body", ruling: "" },
        { power: "The ability to borrow someone else's power", ruling: "" },
        { power: "You can duplicate any item you put in your mouth", ruling: "" },
        { power: "You are impossible to move", ruling: "" },
        { power: "You can turtle your limbs into your body", ruling: "" },
        { power: "That ability to know who the owner is of any particular thing", ruling: "" },
        { power: "The ability to turn invisible while standing still", ruling: "" },
        { power: "You can cook food by touching it", ruling: "" },
        { power: "Lactokinesis", ruling: "" },
        { power: "Papermancy", ruling: "" },
        { power: "Psychic internet browsing", ruling: "" },
        { power: "Altitudeception", ruling: "" },
        { power: "SuperCurling (The sport)", ruling: "" },
        { power: "Can grow fingernails on command, they don't retract", ruling: "" },
        { power: "Can turn small metal objects into yoghurt", ruling: "" },
        { power: "Dice influence", ruling: "" },
        { power: "Make statues invisible", ruling: "" },
        { power: "Pudding vision (can see pudding through walls)", ruling: "" },
        { power: "Blood vision", ruling: "" },
        { power: "Nylon hair", ruling: "" },
        { power: "Orgasm touch (touch someone, and you both orgasm)", ruling: "" },
        { power: "Rain avoidance (it doesn't rain above you)", ruling: "" },
        { power: "Superspeed braiding", ruling: "" },
        { power: "Pop-culture knowledge", ruling: "" },
        { power: "Goat eating", ruling: "" },
        { power: "Karate", ruling: "" },
        { power: "Can make people break out", ruling: "" },
        { power: "Super fast typing", ruling: "" },
        { power: "Slippery feet", ruling: "" },
        { power: "Heely feet", ruling: "" },
        { power: "Third eye", ruling: "" },
        { power: "Hand mouths", ruling: "" },
        { power: "13% bullet proof", ruling: "" },
        { power: "Hairbrush conjuration", ruling: "" },
        { power: "Tape making elbows", ruling: "" },
        { power: "Finger fires", ruling: "" },
        { power: "Sweat control", ruling: "" },
        { power: "Minor temperature aura", ruling: "" },
        { power: "Teleportation to nationally televised sporting events", ruling: "" },
        { power: "You have a small familiar that follows you around, but it's obstinate", ruling: "" },
        { power: "The ability to communicate with insects", ruling: "" },
        { power: "The ability to communicate with and control goldfish", ruling: "" },
        { power: "Water faucet hand", ruling: "" },
        { power: "Mouth hands", ruling: "" },
        { power: "Can levitate up to a liter of water", ruling: "" },
        { power: "Can't get drunk", ruling: "" },
        { power: "You can send a 100 character text with your mind", ruling: "" },
        { power: "You can pull tennis balls out of your pocket", ruling: "" },
        { power: "You can make your bones soft and flexible", ruling: "" },
        { power: "You always have exact change for any purchase less than $37.69", ruling: "" },
        { power: "You turn invisible when you're fully clothed", ruling: "" },
        { power: "Nobody remembers your name", ruling: "" },
        { power: "Shortened by willpower", ruling: "" },
        { power: "Can transform into a potato", ruling: "" },
        { power: "Roll a new power, you have a dog that has that power", ruling: "" },
        { power: "You can roll down car windows", ruling: "" },
        { power: "Speed knitting", ruling: "" },
        { power: "You are a cat girl", ruling: "" },
        { power: "You grow feathers instead of body hair", ruling: "" },
        { power: "You can speak to animals, but not people", ruling: "" },
        { power: "You are a bear", ruling: "" },
        { power: "External-body fluid bending", ruling: "" },
        { power: "You don't have to blink", ruling: "" },
        { power: "Retractable fingers", ruling: "" },
        { power: "Summon olives", ruling: "" },
        { power: "2-way succubus", ruling: "" },
        { power: "The hulk, but with gender", ruling: "" },
        { power: "Human 3d printer", ruling: "" },
        { power: "Cries cheese whiz", ruling: "" },
        { power: "Can catch fire, but not resistant to it", ruling: "" },
        { power: "Farts cotton candy", ruling: "" },
        { power: "Like spiderman, but instead of web it's just string", ruling: "" },
        { power: "Can shoot lasers from eyes, but they're weak normal lasers", ruling: "" },
        { power: "Can shoot lasers from eyes, but it hurts", ruling: "" },
        { power: "Bones are stone", ruling: "" },
        { power: "Change your hair color", ruling: "" },
        { power: "Thigh wings", ruling: "" },
        { power: "Can speak to vegetables", ruling: "" },
        { power: "Prehensile skin", ruling: "" },
        { power: "Bleed alcohol", ruling: "" },
        { power: "Tongue whip", ruling: "" },
        { power: "Resistant to gas", ruling: "" },
        { power: "Two extra knees", ruling: "" },
        { power: "Hair can be shaped into hats", ruling: "" },
        { power: "Internal blood control", ruling: "" },
        { power: "Super intelligent, but speaks like a baby", ruling: "" },
        { power: "Bottomless stomach", ruling: "" },
        { power: "Makes spaghetti from nose", ruling: "" },
        { power: "Flashlight eyes, but you can't see while using them", ruling: "" },
        { power: "Tractor feet", ruling: "" },
        { power: "Shy water breathing", ruling: "" },
        { power: "Monkey feet", ruling: "" },
        { power: "Regenerating banana hands", ruling: "" },
        { power: "Perfect impersonation", ruling: "" },
        { power: "Sharktits", ruling: "" },
        { power: "Can locate water nearby", ruling: "" },
        { power: "Soothing voice", ruling: "" },
        { power: "Can change outfit at will", ruling: "" },
        { power: "KEIJO!!!!!!!!!!!!!!", ruling: "" },
        { power: "Marble vomit", ruling: "" },
        { power: "Exoskeleton", ruling: "" },
        { power: "Glow stick fingers", ruling: "" },
        { power: "Perfect hearing at night", ruling: "" },
        { power: "Two pinkies", ruling: "" },
        { power: "Cow Udder Hair", ruling: "" },
        { power: "Can pull a fistfull of pennies out of thin air", ruling: "" },
        { power: "Can decide the address of the building you are currently in", ruling: "" },
        { power: "You can turn into a frog", ruling: "" },
        { power: "Can unscrew screws from 3 feet away", ruling: "" },
        { power: "Set your hands on fire", ruling: "" },
        { power: "Can become a car", ruling: "" },
        { power: "Can make any plant grow to one foot tall", ruling: "" },
        { power: "Sneezes lightning", ruling: "" },
        { power: "Slinky wrists", ruling: "" },
        { power: "Pez dispenser fingers, random flavors", ruling: "" },
        { power: "Resistance to fork stabbing", ruling: "" },
        { power: "Whenever you say the number 69, everybody else has to say “nice.”", ruling: "" },
        { power: "Can summon sporks", ruling: "" },
        { power: "Very far-sightedness", ruling: "" },
        { power: "Bear hands", ruling: "" },
        { power: "You can peel fruit just by holding them", ruling: "" },
        { power: "Can pop pimples with the power of your mind", ruling: "" },
        { power: "You can cook without fire", ruling: "" },
        { power: "Flammable things catch fire around you while holding your breath", ruling: "" },
        { power: "Stuffing sneezes", ruling: "" },
        { power: "Hallucinogenic tears", ruling: "" },
        { power: "Sentient fingernails", ruling: "" },
        { power: "Smell the passage of time", ruling: "" },
        { power: "Pupils take the forms of numbers", ruling: "" },
        { power: "Tentacle fingers", ruling: "" },
        { power: "Can turn invisible, while saying the word \"invisible\" repeatedly", ruling: "" },
        { power: "*Super* powerful farts, activated by lactose intolerance", ruling: "" },
        { power: "Spiders man", ruling: "" },
        { power: "Spiders, man", ruling: "" },
        { power: "Farting cats", ruling: "" },
        { power: "Can make a piece of paper and pencil appear out of thin air", ruling: "" },
        { power: "Traction", ruling: "" },
        { power: "Hindsight - Squirt ketchup in your eyes, see the past", ruling: "" },
        { power: "Tick Hair - Not like your hair *is* ticks, but it attaches to people like a tick", ruling: "" },
        { power: "You are as strong as the current state of the stock market", ruling: "" },
        { power: "Post-nut clairvoyance", ruling: "" },
        { power: "Every time you say the word \"Soda\", a nearby can of soda flies to your head.", ruling: "" },
        { power: "Torque", ruling: "" },
        { power: "Can talk to food", ruling: "" },
        { power: "you can make people an uncomfortable temperature ", ruling: "" },
        { power: "Your underwear always remain dry", ruling: "" },
        { power: "Heinz sight - Squirt ketchup in your eyes, see the past", ruling: "" },
        { power: "Can lay mysterious eggs", ruling: "" },
        { power: "You are French", ruling: "" },
        { power: "Attention to detail", ruling: "" },
        { power: "Slam poetry", ruling: "" },
        { power: "Stockholm syndrome", ruling: "" },
    ];

    const $gen = $("#generate-btn");
    const $output = $(".output");

    $gen.click(() => {
        let chosen = powers.choose();

        const $power = $('<h3 class="power text-center py-1"></h3>').html(chosen.power);
        // const $ruling = $('<h4 class="ruling text-center mb-3"></h4>').html(chosen.ruling);

        $output.prepend($power);
        // $output.prepend($ruling);
    });
})();