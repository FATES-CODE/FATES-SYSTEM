package com.example.fates_system.service;

import com.example.fates_system.config.AppProperties;
import com.google.api.services.drive.Drive;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Draft;
import com.google.api.services.gmail.model.Message;
import jakarta.activation.DataHandler;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Properties;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItNoticeEmailService {

    private final AppProperties appProperties;
    private final GoogleAuthService googleAuthService;

    /**
     * IT 보안 안내 메일 드래프트 생성
     * @return 생성된 Draft ID (실패 시 null)
     */
    public String createItNoticeDraft() {
        AppProperties.ItNotice config = appProperties.getItNotice();
        String sender = config.getSender();
        String recipient = config.getRecipient();
        String cc = config.getCcRecipients();

        try {
            log.info("[ItNoticeEmailService] Starting IT Notice draft creation. To: {}, CC count: {}",
                    recipient, cc != null ? cc.split(",").length : 0);

            // 1. Google Drive에서 이미지 4개 다운로드
            byte[] img1 = downloadDriveFile(config.getImage1Id());
            byte[] img2 = downloadDriveFile(config.getImage2Id());
            byte[] img3 = downloadDriveFile(config.getImage3Id());
            byte[] img4 = downloadDriveFile(config.getImage4Id());

            // 2. 메일 제목 생성 (오늘 날짜 포함)
            String todayStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));
            String subject = "<INTERNAL> PC 및 자료 관리에 대한 정기 안내 (" + todayStr + ")";

            // 3. 메일 본문 HTML
            String htmlBody = buildHtmlBody();

            // 4. MimeMessage (인라인 이미지 CID 매핑) 구성
            Session session = Session.getDefaultInstance(new Properties(), null);
            MimeMessage mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress(sender));
            mimeMessage.setRecipient(jakarta.mail.Message.RecipientType.TO, new InternetAddress(recipient));

            if (cc != null && !cc.isBlank()) {
                mimeMessage.setRecipients(jakarta.mail.Message.RecipientType.CC, InternetAddress.parse(cc));
            }
            mimeMessage.setSubject(subject, "UTF-8");

            // MimeMultipart("related") 설정
            MimeMultipart multipart = new MimeMultipart("related");

            // HTML 본문 Part
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(htmlBody, "text/html; charset=utf-8");
            multipart.addBodyPart(htmlPart);

            // 이미지 Parts 추가 (CID: image1 ~ image4)
            addImagePart(multipart, img1, "image1");
            addImagePart(multipart, img2, "image2");
            addImagePart(multipart, img3, "image3");
            addImagePart(multipart, img4, "image4");

            mimeMessage.setContent(multipart);

            // 5. Gmail Draft API 호출
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            mimeMessage.writeTo(baos);
            String encoded = Base64.getUrlEncoder().encodeToString(baos.toByteArray());

            Message gmailMessage = new Message();
            gmailMessage.setRaw(encoded);

            Draft draft = new Draft();
            draft.setMessage(gmailMessage);

            Gmail gmailClient = googleAuthService.getGmailClientForUser(sender);
            Draft createdDraft = gmailClient.users().drafts().create("me", draft).execute();

            log.info("[ItNoticeEmailService] Successfully created IT Notice Draft with ID: {}", createdDraft.getId());
            return createdDraft.getId();

        } catch (Exception e) {
            log.error("[ItNoticeEmailService] Failed to create IT Notice draft: {}", e.getMessage(), e);
            return null;
        }
    }

    private void addImagePart(MimeMultipart multipart, byte[] imageBytes, String cid) {
        if (imageBytes == null || imageBytes.length == 0) {
            log.warn("[ItNoticeEmailService] Image data for CID '{}' is empty. Skipping inline attachment.", cid);
            return;
        }
        try {
            MimeBodyPart imagePart = new MimeBodyPart();
            ByteArrayDataSource ds = new ByteArrayDataSource(imageBytes, "image/png");
            imagePart.setDataHandler(new DataHandler(ds));
            imagePart.setHeader("Content-ID", "<" + cid + ">");
            imagePart.setDisposition(MimeBodyPart.INLINE);
            imagePart.setFileName(cid + ".png");
            multipart.addBodyPart(imagePart);
        } catch (Exception e) {
            log.warn("[ItNoticeEmailService] Failed to attach inline image CID '{}': {}", cid, e.getMessage());
        }
    }

    private byte[] downloadDriveFile(String fileId) {
        if (fileId == null || fileId.isBlank()) return null;
        try {
            Drive drive = googleAuthService.getDriveClient();
            try (InputStream is = drive.files().get(fileId).executeMediaAsInputStream()) {
                return is.readAllBytes();
            }
        } catch (Exception e) {
            log.warn("[ItNoticeEmailService] Failed to download Drive file [{}]: {}", fileId, e.getMessage());
            return null;
        }
    }

    public String buildHtmlBody() {
        return """
  <div style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #222222; line-height: 1.6;">
  <p style="margin: 0 0 15px;">社員各位</p>
  <p style="margin: 0 0 15px;">お疲れ様です。</p>
<p style="margin: 0 0 15px;">日頃ご利用のPCやGoogle共有ドライブなどを、<br>
    より安全かつ快適にご利用いただくため、関連情報を社内にて定期的にご案内いたします。</p>
    <p style="margin: 0 0 30px;">従業員の皆様におかれましては、以下の内容をご確認の上、各自ご対応いただきますようお願いいたします。</p>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">1. 悪質なメール、ファイル、URLにご注意ください。</div>
    <p style="margin: 0 0 15px;">顧客やFATESの内部ドメインを装った悪質なメールが届くケースがあります。<br>
    発送人、宛先を十分にご確認いただき、不審なURLやファイルには絶対にアクセスしないようご注意をお願いいたします。</p>
    <p style="color: red; margin: 0 0 30px;">
        ※社内からの正規のセキュリティに関するお願いにつきましては、<br>
        必要に応じて別途ご連絡いたしますので、ご参考ください。
    </p>
    <div style="font-weight: bold; font-size: 32px; color:red; margin-bottom: 32px;">参考写真</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image1" alt="悪質メール注意" style="border: none; max-width: 100%;">
    </div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">2. 共有カレンダーに関する注意事項</div>
    <p style="margin: 0 0 30px;">現在ご利用中の社内共有カレンダーは、システム上、<br>
    他の社員が登録した予定を別の人が修正・削除できる仕様となっております。<br>
    他人の予定をむやみに修正・削除することがないよう、お願い申し上げます。</p>
    <div style="font-weight: bold; font-size:32px; color:red; margin-bottom: 32px;">参考写真</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image2" alt="カレンダー注意" style="border: none; max-width: 100%;">
    </div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">3. デスクトップはすっきりと、外部プログラムは必要な分だけ</div>
    <p style="margin: 0 0 15px;">デスクトップにファイルが溜まっていたり、多数の外部プログラムを起動したままにしていると、メモリ負荷の原因となります。<br>
    デスクトップにファイルが多い場合は、削除やフォルダ分けをして整理していただき、不要な外部プログラムを多数使用していないかチェックをお願いいたします。</p>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">4.業務上不要なファイルのダウンロードはご遠慮いただき、必要な場合、TFチームへお問い合わせください。</div>
    <div style="font-size: 14px; margin-bottom: 10px;"> 
  業務と直接関係のないアプリのダウンロードやインストールは、できるだけご遠慮いただけますようお願い申し上げます。もし、ダウンロードがどうしても必要な場合は、お手数ですが、まずTFチームにご確認いただけますようお願い致します。
</div>
    <div style="font-weight: bold; font-size:32px; color:red; margin-bottom: 32px;">参考写真</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image3" alt="遠慮ファイル" style="border: none; max-width: 100%;">
    </div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">5.Windowsのアップデートは先延ばしにせず、すぐに実行</div>
    <div style="font-size: 14px; margin-bottom: 10px;"> 
    Windowsのアップデートを遅らせることは、セキュリティ脅威にPCを放置するのと同じです。最新の状態を保つことで、システムは安全かつ円滑に稼働します。
  </div>
  <div style="font-weight: bold; font-size: 32px; color:red; margin-bottom: 32px;">参考写真</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image4" alt="UPDATE" style="border: none; max-width: 100%;">
    </div>
    <p style="margin: 0;">以上、よろしくお願いいたします。</p>
    <br>
    <p style="margin: 0 0 15px;">----------------------------------------------------------</p>
    <br>
    <p style="margin: 0 0 15px;">수신자 제위</p>
    <p style="margin: 0 0 15px;">안녕하세요, 업무에 노고가 많으십니다.</p>
    <p style="margin: 0 0 15px;">평소 사용 중이신 PC, Google 공유 드라이브 등을 보다 안전하고 쾌적하게 사용할 수 있도록<br>
    관련 정보를 사내에 정기적으로 공지해 드릴 예정입니다.</p>
    <p style="margin: 0 0 30px;">각 임직원 분들은 아래 내용을 숙지하신 뒤에 각자 실천해 주시기 바랍니다.</p>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">1. 악성메일, 파일, URL에 주의하세요.</div>
    <p style="margin: 0 0 15px;">고객 또는 FATES 내부 도메인을 사용한 악성메일이 수신되는 경우가 있습니다.<br>
    발신인, 수신인을 잘 확인하시고 수상한 URL 및 파일에 절대 접근하지 않도록 주의 부탁 드립니다.</p>
    <p style="margin: 0 0 15px;">하기 사진과 같은 확인되지 않은 메일의 링크나 다운로드는 절대 클릭하지 마시기 바랍니다.</p>
    <p style="color: red; margin: 0 0 30px;">
        ※만약 정말로 사내에서 보내드리는 보안관련 내용이나 요청은,<br>
        필요한 경우에 별도로 연락을 드릴 예정이니 이 점 참고 바랍니다.
    </p>
    <div style="font-weight: bold; font-size: 32px; color:red; margin-bottom: 32px;">참고 사진</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image1" alt="악성메일 주의" style="border: none; max-width: 100%;">
    </div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">2. 공유 캘린더에 대한 주의사항</div>
    <p style="margin: 0 0 30px;">현재 사용중이신 사내 공유 캘린더는,<br>
    시스템 상으로 다른 사원이 등록한 일정을 다른 인원도 수정, 삭제가 가능하도록 되어 있습니다.<br>
    임의로 다른 일정을 수정하거나 삭제하는 일이 없도록 당부 드립니다.</p>
    <div style="font-weight: bold; font-size: 32px; color:red; margin-bottom: 32px;">참고 사진</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image2" alt="캘린더 주의" style="border: none; max-width: 100%;">
    </div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">3. 바탕화면은 깔끔하게, 외부 프로그램은 필요한 만큼만</div>
    <p style="margin: 0 0 15px;">바탕화면에 파일이 쌓여 있거나, 외부 프로그램이 많이 켜져 있으면 메모리 부하의 원인이 됩니다.<br>
    바탕화면에 파일이 많다면 삭제 및 폴더화해서 정리해 주시고,<br>
    불필요한 외부 프로그램을 많이 사용하고 있는 것은 아닌지 체크해 주세요.</p>
     <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">4. 업무상 필요하지 않은 파일은 다운로드 자제해주시고, 다운로드가 필요할 시 TF팀에게 문의주시기 바랍니다.</div>
     <p style="margin: 0 0 15px;">업무와 직접적인 관련이 없는 어플의 다운로드 및 설치는 가급적 지양해 주시길 부탁드립니다. 만약 다운로드가 꼭 필요한 상황이라면, 번거로우시더라도 TF팀에 먼저 확인을 부탁드리겠습니다.</p>
     <div style="font-weight: bold; font-size:32px; color:red; margin-bottom: 32px;">참고 사진</div>
     <div style="margin-bottom: 15px;">
        <img src="cid:image3" alt="遠慮ファイル" style="border: none; max-width: 100%;">
    </div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">5. 윈도우 업데이트는 미루지 말고, 바로바로 진행</div>
    <p style="margin: 0 0 15px;">윈도우 업데이트를 미루는 것은 보안 위협에 PC를 방치하는 것과 같습니다. 최신 상태를 유지해야 시스템이 안전하고 원활하게 돌아갑니다.</p>
    <div style="font-weight: bold; font-size:32px; color:red; margin-bottom: 32px;">참고 사진</div>
    <div style="margin-bottom: 15px;">
        <img src="cid:image4" alt="캘린더 주의" style="border: none; max-width: 100%;">
    </div>
    <p style="margin: 0 0 40px;">이상.</p>
</div>
""";
    }
}
