const jokeContainer = document.querySelector(".joke")
const btn = document.querySelector("#joke-btn")

async function createJokeElement() {
  try {
    const joke = document.createElement("p")
    const { joke: text } = await getJoke()
    joke.textContent = text
    return joke
  } catch (e) {
    return console.log(e.message)
  }
}

async function getJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: [["Accept", "application/json"]],
    })
    return response.json()
  } catch (e) {
    return console.log(e.message)
  }
}

async function updateJoke(jokeElement) {
  try {
    const { joke } = await getJoke()
    jokeElement.textContent = joke
  } catch (e) {
    return console.log(e.message)
  }
}

async function main() {
  console.log(await getJoke())
  try {
    const joke = await createJokeElement()
    jokeContainer.appendChild(joke)
    btn.addEventListener("pointerup", () => updateJoke(joke))
  } catch (e) {
    console.log(e.message)
  }
}

main()
