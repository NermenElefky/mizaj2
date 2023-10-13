export function makeNotify(
  main,
  submain,
  time,
  userEmail,
  setIsThereNewNotify
) {
  let data = JSON.parse(localStorage.getItem("users"));
  let newData = data.map((item) => {
    if (item.email === userEmail) {
      return {
        ...item,
        notifications: {
          old: [...item.notifications.old],
          new: [{ main, submain, time }, ...item.notifications.new],
        },
      };
    } else {
      return item;
    }
  });

  localStorage.setItem("users", JSON.stringify(newData));

  // show that there is new notifications
  setIsThereNewNotify("block");
}
