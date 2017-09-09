# coremvc_angular_new_structure
Angular與 Core MVC 新的纏綿方式


整合 Angular 與 ASP.NET MVC Core 在一起

# angulr-cli.json

修改 outDir 到 mvc 專案下的 wwwroot/dist 資料夾
設定 deployUrl 為 "/dist/"，只要目的是要確保輸出的 script 檔案路徑是相對於 wwwroot 的 dist 路徑
修改 index 為 "<any>.html" 檔案，這個檔案只負責儲存 angular-cli 建置後的 script 檔案名稱及路徑

# _layout.cshtml

將 "<any>.html" 檔案加入

```
@Html.Partial("~/wwwroot/dist/script.html")
```

# Starup.cs
增修 UseMvc Routes 規則，新增一條規則給 Angular App fallback 使用 (Controller/Action 可依自己喜好設定)

**HomeController 新增 `Angular` Action function**

```
routes.MapRoute("spa-fallback", "{*anything}", new { controller = "Home", action = "Angular" });
```

依此規則，在 Views/Home/Angular.cshtml 裡，新增 `<app-root></app-root>`


