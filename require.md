<!-- @format -->

一、系统目标

目标：让餐厅员工能够快速修改菜单文字和价格，同时保证菜单展示稳定、美观，并可以一键恢复默认模板。未来可扩展多屏同步或云端管理。

二、用户角色

餐厅员工

修改菜单文字和价格

保存修改

查看哪些字段被改过

恢复默认模板

餐厅老板/管理员

查看菜单状态

确认修改是否被保存

管理多屏显示（未来扩展）

三、核心功能 User Story

1. 查看菜单

As 餐厅员工
I want 打开菜单页面看到完整的轮播菜单
So that 我可以知道当前菜单展示情况

2. 修改文字和价格

As 餐厅员工
I want 点击菜单项修改文字或价格
So that 我可以更新菜单信息

3. 标记已修改字段

As 餐厅员工
I want 系统提示哪些字段被修改过
So that 我可以清楚知道哪些内容是改过的

4. 保存修改

As 餐厅员工
I want 点击保存按钮将修改保存到 localStorage
So that 下次打开页面还能看到修改后的数据

5. 恢复默认模板

As 餐厅员工
I want 点击“恢复默认”按钮
So that 我可以快速撤销所有修改，回到初始模板

6. 单字段恢复（可选）

As 餐厅员工
I want 点击某个字段的“Reset”
So that 我可以只恢复这个字段的默认值

7. 修改概览（可选高级）

As 餐厅员工
I want 页面显示“3 items modified”或者高亮被修改字段
So that 我可以快速了解哪些菜单项被更改

8. 历史记录（可选）

As 餐厅老板
I want 查看最近 N 次修改记录（旧值 → 新值）
So that 我可以追踪价格变化，防止错误修改

9. 本地优先读取

As 系统
I want 优先从 localStorage 读取菜单数据
So that 即使没有网络，员工也可以操作菜单

10. 电视全屏轮播

As 餐厅员工
I want 菜单在电视上全屏播放轮播
So that 顾客可以清楚看到菜单信息

四、原始菜单数据
Homemade Dumplings Steamed or Pan-fried
1 Pork with Cabbage and Green onion
2 Beef with Onion and Carrot
3 Lamb with Zucchini and Leek
4 Chicken with Celery and Mushroom
5 Pork with Prawn and Bok Choi
6 Turkey with Spinach and Sweet Corn
7 Vegetarian with Bean Sprouts Cabbage and Carrot

Kong Fu Rice Bowls
8 Tibetan-style Potato and Beef Rice Bowl
9 Kun Pao Chicken Rice Bowl (GFO)
10 Beijing Roast Duck Rice Bowl
11 Sichuan-style Stir-fried Pork Rice Bowl (GFO)
12 Teriyaki Salmon Rice Bowl (GFO)
13 Taiwanese Pork Belly Rice Bowl
14 Mapo Tofu Rice Bowl (GFO)
15 Mushroom Satay Chicken Rice Bowl
16 Mongolian Grilled Beef Rice Bowl (GFO)
17 Hong Kong-style Curry Pork Chop Rice Bowl

Soup

18 Sichuan Chunky Beef Noodle Soup
19 Shanghai Wonton Noodle Soup
20 Yunnan Rice Noodle Soup with Crispy Pork
21 Kong Fu Malatang Hot Pot (GFO)

Noodle & Fried Rice

22 Stir Fry Egg Noodles
Combination
Prawn
Char Siu Pork
Chicken
Beef
Tofu (Vegetarian)

23 Singapore Noodles (GFO)
Combination
Prawn
Char Siu Pork
Chicken
Beef
Tofu (Vegetarian or Vegan)

24 Pad Thai (GFO)
Combination
Prawn
Char Siu Pork
Chicken
Beef
Tofu (Vegetarian or Vegan)

25 Kong Fu Fried Rice (GFO)
Combination
Prawn
Char Siu Pork
Chicken
Beef
Tofu (Vegetarian or Vegan)

Side Dish

26 BBQ Pork Bun (Steamed or Pan Fried)
27 Pork Belly Steam Bao (1pc)
28 Fried Chicken Steam Bao (1pc)
29 Pork Dim Sims (Steamed or Fried)

每个 object 有
图片，名字，价格，可选项（加价），口味选项。

五、界面页面结构

Screen（播放端）

轮播显示菜单

自动轮播

全屏播放

Editor（编辑端）

列表式编辑每个菜单项

修改文字和价格

显示修改标记

保存 / Reset 按钮
