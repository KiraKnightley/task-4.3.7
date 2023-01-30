const debounce = (fn, debounceTime) => {
    let time;
    return function(...args){
        clearTimeout(time);
        time = setTimeout(() => {
            fn.apply(this, args);
        }, debounceTime)
    }
};

const input = document.querySelector('.main_input');

input.addEventListener('input', debounce(function(event){
    if(input.value){
        getRepos(event)
    } else {
        clear()
    }
}, 1000))

function getRepos(event){
    const ref = fetch(`https://api.github.com/search/repositories?q=${event.target.value}&per_page=5`)
    
    ref.then(response => {
                    if (response.status != 200) {
                        return null;
                    } else {
                        return response.json();
                    }
                },
                reject => {
                    return null;
                }
    ).then(data => {
        if(data.items.length){
            for (let i = 0; i < data.items.length; i++){
                let array = data.items[i]
                box(array)
            }
        } else null
    }
    )
}

function box(arr){
    const container = document.createElement('div')
    container.className = 'container'
    document.body.append(container)

    const nameJob = document.createElement('div')
    const nameLogin = document.createElement('div')
    const stars = document.createElement('div')
    nameJob.className = 'item'
    nameLogin.className = 'item'
    stars.className = 'item'  
    nameJob.innerHTML = `Имя репозипория: ${arr.name}`
    nameLogin.innerHTML = `Имя владельца: ${arr.owner.login}`
    stars.innerHTML = `Количество звезд: ${arr.stargazers_count}`
    container.append(nameJob)
    container.append(nameLogin)
    container.append(stars)

    const btn = document.createElement('button')
    btn.className = 'button'
    btn.textContent = 'close'
    container.append(btn)

    btn.addEventListener('click', (e) => {
        container.remove()
    })
}

function clear(){
    let elem = document.querySelectorAll('.container')
    elem.forEach(e => e.remove())
}