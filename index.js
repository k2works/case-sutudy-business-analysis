import "./style.css";
import render from "@k2works/full-stack-lab";

const contents = `

# ケーススタディ

## 基本スキル
### [ロジカルシンキング・クリティカルシンキング](docs/logicalthink.html)
### [ビジネスモデルキャンバス](docs/business_model_canvas.html)
### [企業経営理論](docs/business_strategy.html)
### [運営管理](docs/business_operations.html)
## 実践
## [農業法人Ａ社の事例](docs/case/r04_case_1.html)
## [印刷・広告制作会社A社の事例](docs/case/r03_case_1.html)
## [老舗の蔵元A社の事例](docs/case/r02_case_1.html)
## [農業用機械や産業機械装置を製造する中小メーカーA社の事例](docs/case/r01_case_1.html)
## [エレクトロニクス・メーカーＡ社の事例](docs/case/h30_case_1.html)
## [食肉と食肉加工品の製造・販売を行うB社の事例](docs/case/r04_case_2.html)
## [豆腐の製造販売業者B社の事例](docs/case/r03_case_2.html)
## [農業生産法人B社の事例](docs/case/r02_case_2.html)
## [ネイルサロンB社の事例](docs/case/r01_case_2.html)
## [金属製品製造業であるC社の事例](docs/case/r04_case_3.html)
## [革製のバッグを製造、販売するC社の事例](docs/case/r03_case_3.html)
## [ステンレス製品の受注・製作・据付を行うC社の事例](docs/case/r02_case_3.html)
## [金属部品の熱処理や機械加工を営むC社の事例](docs/case/r01_case_3.html)

`;

const mindmap = `
@startmindmap

* ケーススタディ
** 基本スキル
*** ロジカルシンキング
*** クリティカルシンキング
*** イシューツリー
** 分析ツール
*** ビジネスモデルキャンバス
*** 企業経営理論
**** 経営戦略
**** 経営組織
**** マーケティング
*** 運営管理
**** 生産管理
**** 店舗・販売管理
** 実践
*** 農業法人Ａ社の事例
*** 印刷・広告制作会社A社の事例
*** 老舗の蔵元A社の事例
*** 農業用機械や産業機械装置を製造する中小メーカーA社の事例
*** エレクトロニクス・メーカーＡ社の事例
*** 食肉と食肉加工品の製造・販売を行うB社の事例
*** 農業生産法人B社の事例
*** ネイルサロンB社の事例
*** 金属製品製造業であるC社の事例
*** 革製のバッグを製造、販売するC社の事例
*** ステンレス製品の受注・製作・据付を行うC社の事例

-- 現状分析
--- 環境分析
---- 組織図
---- SWOT分析
---- VRIO分析
--- 事業分析
---- 企業戦略
----- ドメイン
----- 成長戦略
---- 事業戦略
----- 基本戦略
----- 競争地位別の戦略
----- 価値連鎖
---- 機能戦略
--- 業務分析
---- 業務領域（サブドメイン）
----- 中核の業務領域（コアドサブメイン）
----- 一般的な業務領域（汎用サブドメイン）
----- 補完的な業務領域（サポートサブドメイン）
---- ビジネスコンテキスト
---- ビジネスユースケース
-- 課題設定
-- 解決策

@endmindmap
`;

const usecase = `
@startuml
left to right direction
actor "Actor" as ac
rectangle Application {
  usecase "UseCase1" as UC1
  usecase "UseCase2" as UC2
  usecase "UseCase3" as UC3
}
ac --> UC1
ac --> UC2
ac --> UC3
@enduml
`;

const ui = `
@startsalt
{+
  コレクション画面
  {+
  {
  生徒
  教員
  組
  部
  イベント
  } |
  {
    == 生徒
    { + <&zoom-in> (          )}
    {T#
    + 田尻　智裕  | 3年B組    | 野球部 写真部
    + 山田　太郎  | 3年A組    | 野球部
    + 鈴木　花子  | 3年A組    | 写真部
    }
  }
  }
----------------
  シングル画面
  {+
  {
  生徒
  教員
  組
  部
  イベント
  } |
  {
    {
      <&person> <b>田尻 智裕
    }
    {
      名前
      田尻　智裕
      組
      3年B組
      部
      野球部 写真部
      関連する生徒
      田尻　智裕 山田　太郎　鈴木　花子
    }
  }
  }
}
@endsalt
`;

const uiModel = `
@startuml
  class 部 {
    名称
    カテゴリー
    生徒数
    印刷()
    新規()
    削除()
  }
  class 生徒 {
    氏名
    成績
    印刷()
    新規()
    削除()
  }
  class 組 {
    名称
    印刷()
    新規()
    削除()
  }
  class 教員 {
    氏名
    電話番号
    印刷()
    新規()
    削除()
  }
  class イベント {
    名称
    日付
    印刷()
    新規()
    削除()
  }
  部 *-* 生徒
  部 *-- 教員
  イベント *- 教員
  生徒 --* 組
`;

const uiInteraction = `
@startuml
  イベント_コレクション --> イベント_シングル
  イベント_シングル --> 教員_シングル
  教員_コレクション --> 教員_シングル
  教員_シングル --> 部_コレクション
  教員_シングル <-> 組_シングル
  組_コレクション --> 組_シングル
  組_シングル --> 生徒_コレクション
  生徒_コレクション --> 生徒_シングル
  生徒_シングル -> 組_シングル
  生徒_シングル --> 部_コレクション
  部_コレクション --> 部_シングル
  部_シングル --> 生徒_コレクション
@enduml
`;

const uml = `
@startuml
abstract class AbstractList
abstract AbstractCollection
interface List
interface Collection
List <|-- AbstractList
Collection <|-- AbstractCollection
Collection <|- List
AbstractCollection <|- AbstractList
AbstractList <|-- ArrayList
class ArrayList {
  Object[] elementData
  size()
}
enum TimeUnit {
  DAYS
  HOURS
  MINUTES
}
annotation SuppressWarnings
@enduml
`;

const erd = `
@startuml
' hide the spot
hide circle
' avoid problems with angled crows feet
skinparam linetype ortho
entity "Entity01" as e01 {
  *e1_id : number <<generated>>
  --
  *name : text
  description : text
}
entity "Entity02" as e02 {
  *e2_id : number <<generated>>
  --
  *e1_id : number <<FK>>
  other_details : text
}
entity "Entity03" as e03 {
  *e3_id : number <<generated>>
  --
  e1_id : number <<FK>>
  other_details : text
}
e01 ||..o{ e02
e01 |o..o{ e03
@enduml
`;

const mode = "DOC"; // "UI" or "API" or "DOC"
render({ mindmap, contents, ui, uiModel, uiInteraction, usecase, uml, erd, mode });
