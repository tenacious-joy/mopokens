export const sequence = {
    patterns : [],
    swap: function(array, pos1, pos2) {
        const temp = array[pos1];
        array[pos1] = array[pos2];
        array[pos2] = temp;
    },
    heapsPermute: function(array = [], n) {
        n = n || array.length;
        if (n === 1) {
            const validArray = [].concat(array);
            sequence.patterns.push(validArray);
        } else {
            for (let i = 1; i <= n; i++) {
                sequence.heapsPermute(array, n-1);
                var j;
                if (n % 2) {
                    j = 1;
                } else {
                    j = i;
                }
                sequence.swap(array, j-1, n-1);
            }
        }
        return sequence.patterns;
    },

    isArrayDifferent: function(array, input) {
      //  console.log(array, input);
      const op = input.map((elem, idx) => {
            if(JSON.stringify(elem) === JSON.stringify(array[idx])) {
                return true;
            }
            return false;
        });
        return op.includes(false);
    }
}