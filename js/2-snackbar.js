// Очукуємо на подію відправлення форми
    document.querySelector('.form').addEventListener('submit', function (event) {
      event.preventDefault(); // Запобігаємо перезавантаженню сторінки

      const delay = Number(event.target.delay.value); // Затримка в мс
      const state = event.target.state.value; // Стан (fulfilled/rejected)

      // Створюємо проміс
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      // Обробка промісу
      promise
        .then(delay => {
          iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight'
          });
        })
        .catch(delay => {
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight'
          });
        });
    });