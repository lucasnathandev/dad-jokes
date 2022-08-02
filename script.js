const jokeContainer = document.querySelector(".joke")
const btn = document.querySelector("#joke-btn")

async function createJokeElement() {
  const joke = document.createElement("p")
  try {
    const { joke: text } = await getJoke()
    joke.textContent = text
  } catch (e) {
    joke.textContent =
      "Cannot generate joke, and it's not a joke. Please touch the button below."
  } finally {
    return joke
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
    jokeElement.textContent =
      "Cannot generate joke, and it's not a joke. Please touch the button below."
    updateJoke(jokeElement)
  }
}

async function main() {
  try {
    const joke = await createJokeElement()
    jokeContainer.appendChild(joke)
    btn.addEventListener("pointerup", () => updateJoke(joke))
  } catch (e) {
    joke.textContent =
      "Cannot generate joke, and it's not a joke. Please touch the button below"
    updateJoke(joke)
  }
}

main()
