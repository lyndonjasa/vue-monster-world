import { ref } from "vue";

const useTypewriter = () => {
  const writtenMessage = ref<string>('');

  const writeMessage = (message: string, delay: number): void => {
    let iterator = 0;
    writtenMessage.value = '';
    const speed = getAnimationSpeed(message, delay);

    function typeWriter() {
      if (iterator < message.length) {
        writtenMessage.value += message.charAt(iterator);
        iterator++;
        setTimeout(typeWriter, speed)
      }
    }

    typeWriter();
  }

  const getAnimationSpeed = (message: string, delay: number): number => {
    const length = message !== '' ? message.length : 1;

    return Math.floor(delay / length)
  }

  return {
    writtenMessage,
    writeMessage
  }
}

export default useTypewriter;