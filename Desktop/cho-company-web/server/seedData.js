export const seedNews = [
  {
    title: "【展示会】SCA/HPCAsia 2026 弊社代理店QUNOVA COMPUTING出展（ブース番号：ST-5）",
    date: "2026.01.26",
    category: "EXHIBITION",
    summary: "2026年1月26日(月)〜29日(木)開催のSCA/HPCAsia 2026にて、弊社が代理店を務めているQUNOVA COMPUTINGが出展いたします。",
    link: "https://www.sca-hpcasia2026.jp/jp/",
    isHighlight: true
  },
  {
    title: "【スマート工場 EXPO】1NCE・ソフトバンク社共同出展ブースにMODULA-100出品",
    date: "2026.01.21",
    category: "EXHIBITION",
    summary: "スマート工場 EXPO 2026にて、1NCE・ソフトバンク共同出展ブースに弊社のMODULA-100が出品されました。",
    link: "#",
    isHighlight: true
  },
  {
    title: "PRODUCTSページに「SSL認証書自動管理ソリューション(NeoCertManager)」の情報を追加",
    date: "2025.12.15",
    category: "PRODUCT",
    summary: "安全で迅速なSSL証明書ライフサイクル管理を実現するNeoCertManagerソリューションをラインナップに追加しました。",
    link: "#",
    isHighlight: false
  },
  {
    title: "MORECAご活用者の富士山測候所・特任教授 鴨川先生よりコメントを頂きました",
    date: "2025.12.05",
    category: "PRESS",
    summary: "過酷な環境下でのライブ観測カメラMORECAの実績と評価についてコメントを頂戴いたしました。",
    link: "http://www.moreca.net/#comment",
    isHighlight: false
  },
  {
    title: "「HY-CHECK」の紹介動画をリニューアルいたしました",
    date: "2025.11.17",
    category: "MEDIA",
    summary: "AIoTベースの水道メーター遠隔検針プラットフォーム「HY-CHECK（ハイチェック）」の最新デモ動画を公開。",
    link: "https://www.youtube.com/watch?v=dRZ2uUqHqps",
    isHighlight: false
  },
  {
    title: "ソニーネットワークコミュニケーションズのサイトにESL(電子棚札)が掲載されました",
    date: "2025.05.19",
    category: "PARTNERSHIP",
    summary: "スマートリテール変革を推進する電子棚札(ESL)システムがソニーネットワークコミュニケーションズにて紹介されました。",
    link: "https://ict.sonynetwork.co.jp/service/esl.html",
    isHighlight: false
  },
  {
    title: "新世代AIカメラソリューション「MORECA AI+」リリース",
    date: "2024.10.17",
    category: "PRODUCT",
    summary: "オンプレミス＆エッジAI分析を融合した次世代監視・データ収集カメラMORECA AI+の提供を開始いたしました。",
    link: "#",
    isHighlight: true
  }
];

export const seedProducts = [
  {
    id: "moreca-ai",
    title: "MORECA AI+",
    subTitle: "エッジAI・ソーラーLTE一体型スマートカメラ",
    category: "AI & Camera",
    badge: "FLAGSHIP",
    description: "富士山測候所や過酷な屋外現場でも稼働する高耐久・自立型クラウドAIカメラ。電源のない場所でもソーラー給電とLTE通信で即座に現場のリアルタイム可視化とAI異常検知を実現します。",
    features: [
      "SIM内蔵(LTE/sXGP対応)でネットワーク工事不要",
      "エッジAIによる人物・侵入・車両のインテリジェント検知",
      "ソーラーパネル＆大容量バッテリー一体型モデル対応",
      "クラウド/YouTubeライブストリーミング連携"
    ],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    externalLink: "https://www.moreca.net/"
  },
  {
    id: "hy-check",
    title: "HY-CHECK",
    subTitle: "AIoT 水道メーター遠隔自動検針プラットフォーム",
    category: "Smart City / AIoT",
    badge: "POPULAR",
    description: "既存のアナログメーターに小型デバイスを装着するだけで、AI画像認識により数値を自動読取。人手不足の検針業務を100%デジタル化・省力化します。",
    features: [
      "既存メーターを交換することなく後付け設置可能",
      "低消費電力LPWA/LTE通信で長期間の電池駆動を実現",
      "高精度OCR AIによる漏水検知および異常アラート",
      "自治体・ビル管理会社向け統合ダッシュボード提供"
    ],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    externalLink: "#"
  },
  {
    id: "modula-100",
    title: "MODULA-100",
    subTitle: "超小型グローバルIoTゲートウェイ & ルーター",
    category: "IoT Hardware",
    badge: "NEW",
    description: "スマート工場、遠隔機器監視、産業用センサーネットワークに最適な高信頼性通信端末。世界各国のキャリアバンドをサポートし、グローバル展開を加速します。",
    features: [
      "マルチバンドLTE Cat.1 / Cat.M1 / NB-IoT対応",
      "堅牢な産業用設計・広温度範囲動作 (-30℃〜+75℃)",
      "各種産業プロトコル(RS485, Modbus, GPIO)サポート",
      "SoftBank / 1NCE グローバルSIMプリセット対応"
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    externalLink: "#"
  },
  {
    id: "esl-solution",
    title: "ESL (Electronic Shelf Label)",
    subTitle: "スマートリテール 電子棚札システム",
    category: "Retail Tech",
    badge: "EXPANDING",
    description: "POSシステムと即時連動し、店舗内の価格表示やプロモーション情報をワイヤレスで一括更新。省人化とダイナミックプライシングを実現します。",
    features: [
      "高コントラスト電子ペーパー（黒・白・赤・黄マルチカラー）",
      "5〜10年の超長寿命バッテリー運用",
      "NFC / LEDインジケーター搭載でピッキング支援",
      "大手量販店・流通チェーンへの導入実績"
    ],
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800&q=80",
    externalLink: "#"
  },
  {
    id: "neocert-manager",
    title: "NeoCertManager",
    subTitle: "SSL/TLS電子証明書 自動管理ソリューション",
    category: "Security Solution",
    badge: "ENTERPRISE",
    description: "企業内の膨大なSSL/TLS証明書の更新・展開・監視を自動化し、期限切れによるサービスダウンやセキュリティ事故をゼロにします。",
    features: [
      "マルチCA対応（パブリック・プライベート証明書統合）",
      "期限前自動更新およびWebサーバへの自動デプロイ",
      "暗号化脆弱性および不正証明書のリアルタイムスキャン",
      "SOC2 / ISO27001 監査対応レポート機能"
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    externalLink: "#"
  },
  {
    id: "isr-series",
    title: "ISR Series",
    subTitle: "車載・移動体対応 高速モバイルルーター",
    category: "Network Device",
    badge: "PROVEN",
    description: "バス、鉄道、緊急車両、遠隔現場などのモビリティ環境に特化した高耐久LTEルーター。KDDI IoT試験合格および車載規格準拠。",
    features: [
      "車載電源ノイズ耐性＆振動耐性設計",
      "デュアルSIMフェイルオーバーによる通信冗長化",
      "GNSS/GPS位置トラッキング機能搭載",
      "公衆Wi-Fiスポット＆車載テレマティクス対応"
    ],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    externalLink: "#"
  }
];
