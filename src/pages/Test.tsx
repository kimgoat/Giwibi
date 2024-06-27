import React, { useEffect, useState } from "react";

const Test: React.FC = () => {
  const [isNotificationSupported, setIsNotificationSupported] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState("");

  useEffect(() => {
    // 브라우저가 알림을 지원하는지 확인
    if ("Notification" in window) {
      setIsNotificationSupported(true);
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
    });
  };

  const sendNotification = () => {
    if (notificationPermission === "granted") {
      console.log("Attempting to send notification");
      const notification = new Notification("테스트 알림", {
        body: "이것은 테스트 웹 푸시 알림입니다.",
      });

      notification.onclick = () => {
        console.log("Notification clicked");
      };

      notification.onshow = () => {
        console.log("Notification shown");
      };

      notification.onerror = (err) => {
        console.error("Notification error:", err);
      };
    } else {
      alert("알림 권한이 필요합니다.");
    }
  };

  if (!isNotificationSupported) {
    return <div>이 브라우저는 웹 푸시 알림을 지원하지 않습니다.</div>;
  }

  return (
    <div>
      <h2>웹 푸시 알림 테스트</h2>
      <p>현재 알림 권한 상태: {notificationPermission}</p>
      {notificationPermission !== "granted" && (
        <button onClick={requestPermission}>알림 권한 요청</button>
      )}
      <button
        onClick={sendNotification}
        disabled={notificationPermission !== "granted"}
      >
        테스트 알림 보내기
      </button>
    </div>
  );
};

export default Test;
