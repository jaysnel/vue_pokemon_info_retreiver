new Vue({
    el: '#pokemonInfoRetriever',
    data: {
        // Info Shown To Client Side
        incorrectInput: null,
        pokemonTypeInfo: null,
        pokemonImage: null,
        pokemonIndex: null,
        pokemonHeightInFeet: null,
        pokemonWeightInPounds: null,
        randomListOfPokemonMoves: null,

        // Info Hidden From Client Side, Used For Inner Functions
        pokemonNameInput: null,
        pokemonMoves: null,
        pokemonHeight: null,
        pokemonWeight: null
    },
    methods: {
        // Kickoff function to gather all data needed
      getPokemonData: function(insertedPokemonName) {
        axios.get('https://pokeapi.co/api/v2/pokemon/'+ insertedPokemonName.toLowerCase())
        .then((res) => {
            this.pokemonImage = res.data.sprites.front_default;
            this.pokemonTypeInfo = res.data.types;
            this.pokemonIndex = "Index: #" + res.data.game_indices[0].game_index;
            this.pokemonMoves = res.data.moves;
            this.pokemonWeight = res.data.weight;
            this.pokemonHeight = res.data.height
            // Calling Inner Functions
            this.getPokemonType();
            this.getRandomListOfPokemonMoves();
            this.getpokemonWeightInPounds();
            this.getpokemonHeightInFeet();


            this.incorrectInput = null;
        })
        .catch((err) => {
            console.log(err);
            this.incorrectInput = "Sorry, Please try typing in a pokemon name or check spelling!"

            // Hiding These Values If User Input Is Not Correct
            this.pokemonTypeInfo = null;
            this.pokemonImage = null;
            this.pokemonIndex = null;
            this.pokemonWeightInPounds = null;
            this.pokemonHeightInFeet = null;
            this.randomListOfPokemonMoves = null;
        })
      },

      // Getting Pokemon type
      getPokemonType: function() { 
        let z = [];
        for(let i = 0; i <= this.pokemonTypeInfo.length - 1; i++) {
            z.push(this.pokemonTypeInfo[i].type.name.toUpperCase());
        }
        return this.pokemonTypeInfo = "Type: " + z.join();
      },

      // Getting A Random List Of 3 Pokemon Moves On Each Refresh
      getRandomListOfPokemonMoves: function() {
        let x = [];
        let y = [];
        for(let i = 0; i <= this.pokemonMoves.length - 1; i++) {
            x.push(this.pokemonMoves[i].move.name.toUpperCase());
        }
        for(let j = 0; j <= 2; j++) {
            y.push(x[Math.floor((Math.random() * x.length) + 1)]);
        }
        let newY = y.join();

        return this.randomListOfPokemonMoves = "Moves Able To Learn: " + newY.replace(/,/g,", ");
      },
      getpokemonWeightInPounds: function() {
        return this.pokemonWeightInPounds = "Weight: " + Math.round(this.pokemonWeight * (1/4.5359237)) + " lbs";
      },
      getpokemonHeightInFeet: function() {
        return this.pokemonHeightInFeet = "Height: " + Math.round(this.pokemonHeight * (1/3.048)) + " ft";
      }
    }
})