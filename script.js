const progressBar = document.querySelector(".progress-bar");
const uploadCount = document.querySelector(".upload-count");
const loadingStatus = document.querySelector(".loading-status");
const finishBox = document.querySelector(".finish-box");
const contentTitle = document.querySelector(".content-title");

const uploadRequiredEvent = new Event("uploadRequired");
const uploadStartedEvent = new Event("uploadStarted");
const uploadProgressEvent = new Event("uploadProgress");
const uploadFailedEvent = new Event("uploadFailed");
const uploadFinishedEvent = new Event("uploadFinished");

const dataJson = {
  quests: [],
};

const dataCreate = () => {
  for (let i = 0; i < 5; i++) {
    dataJson.quests.push({
      id: i + 1,
      title: `quest ${i + 1}`,
    });
  }
};

const dataFetch = () => {
  let currentIndex = 0;

  const fetchNextData = () => {
    if (currentIndex < dataJson.quests.length) {
      const percentage = ((currentIndex + 1) / dataJson.quests.length) * 100;
      progressBar.style.width = `${percentage.toFixed(2)}%`;
      uploadCount.textContent = `${currentIndex + 1}/${dataJson.quests.length}`;
      loadingStatus.textContent = "Yükleniyor...";

      currentIndex++;

      setTimeout(() => {
        fetchNextData();
      }, 1000);
    } else {
      loadingStatus.textContent = "Yüklendi";
      contentTitle.textContent = "Sınav cevapları gönderildi";
      document.dispatchEvent(uploadFinishedEvent);
    }
  };

  fetchNextData();
};

const buttonCreate = () => {};

document.addEventListener("uploadRequired", () => {
  document.addEventListener("uploadStarted", () => {
    dataCreate();
    console.log(dataJson);
    dataFetch();
  });
});

document.addEventListener("uploadFinished", () => {
  finishBox.style.display = "flex";
});

document.dispatchEvent(uploadRequiredEvent);
document.dispatchEvent(uploadStartedEvent);
