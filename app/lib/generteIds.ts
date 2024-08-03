export async function generateChatRoomId(email1: string, email2: string) {
  const len1 = email1.length;
  const len2 = email2.length;

  if (email1 === email2) {
    return;
  }

  if (len1 > len2) {
    return email1 + email2;
  } else if (len1 < len2) {
    return email2 + email1;
  } else {
    const buffer1 = Buffer.from(email1);
    const buffer2 = Buffer.from(email2);

    for (let i = 0; i < buffer1.length; i++) {
      if (buffer1[i] > buffer2[i]) {
        return email1 + email2;
      } else if (buffer1[i] < buffer2[i]) {
        return email2 + email1;
      } else {
        continue;
      }
    }
  }
}
