function convertCommaToDot(numberString) {
    // Substitui todas as vírgulas por pontos
    return numberString.replace(/,/g, '.');
}

function split(string, delimiter) {
    // Divide a string usando o delimitador
    const parts = string.split(delimiter)
    // Converte cada parte para float e retorna como uma lista
    return parts.map(part => parseFloat(part))
}

function findCombination(numbers, targetSum) {
    const result = [];

    function backtrack(start, currentSum, currentCombination) {
        if (currentSum === targetSum) {
            result.push([...currentCombination]);
            return true;
        }

        for (let i = start; i < numbers.length; i++) {
            if (currentSum + numbers[i] <= targetSum) {
                currentCombination.push(numbers[i]);
                if (backtrack(i + 1, currentSum + numbers[i], currentCombination)) {
                    return true;
                }
                currentCombination.pop();
            }
        }
        return false;
    }

    backtrack(0, 0, []);
    return result.length > 0 ? result[0] : null;
}

document.getElementById("start").addEventListener("click", function(){
    const target_sum = parseFloat(document.getElementById("target-sum").value)
    var data = document.getElementById("data").value
    const result = document.getElementById("result")

    if (!data || !target_sum)
        alert("Erro ao verificar dados ou valor-alvo")
    else{
        data = convertCommaToDot(data)
        const data_map = split(data, " ")
        const combo = findCombination(data_map, target_sum)
        if (combo) {
            document.getElementById("result").value = combo.join(", ")
            console.log("teste2", combo)
        } else {
            result.textContent = "Nenhuma combinação encontrada";
        }
    }
})

document.getElementById('copyToClipboard').addEventListener('click', function(ev){ //
    const button =ev.currentTarget
    if(button.innerText === 'Copy'){
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(result.value)//Navigator da classe window, tem o clipboard q e a area de transferencia, e o write text e o que copia
    } else{
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})