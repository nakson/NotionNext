# 像素漫游素材

## 当前状态

逻辑（走动 / 进门 / 走廊）已接好；**场景美术改为你自己用拼图软件导出**。

无底板图时引擎用色块占位（墙、地板、地毯、门、贩卖机、台灯）。

## 请你导出后放入

| 文件 | 尺寸建议 |
|------|----------|
| `lobby-hall.png` | **320×180**（首页大厅） |
| `corridor-reading.png` | 约 **480×80** |
| `corridor-music.png` | 同上 |
| `corridor-essay.png` | 同上 |
| `corridor-recipe.png` | 同上 |
| `corridor-notes.png` | 同上 |
| `corridor-film.png` | 同上 |

素材可用本目录下的 `Top-Down_Retro_Interior/`（在 Tiled / Aseprite 里拼）。

门区与碰撞：`themes/custom/components/pixel-walk/config/lobbyMap.js`  
图放好后若门对不齐，把 trigger 坐标改一下即可。

## 其它

| 路径 | 说明 |
|------|------|
| `Top-Down_Character_Animations/` | 角色精灵（已接入） |
| `Top-Down_Retro_Interior/` | 室内 tileset，供你拼图用 |
