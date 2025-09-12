/* 目立つログアウトボタン（.btn-mini を上書き） */
.btn-mini.logout{
  display: block;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;

  background: #e53935;      /* 赤背景 */
  border: 1px solid #b71c1c;
  color: #ffeb3b;           /* 黄色文字 */
  font-weight: 700;
  text-align: center;
  text-shadow: 0 1px 0 rgba(0,0,0,.25);
}
.btn-mini.logout:hover{ background:#d32f2f; border-color:#b71c1c; }
.btn-mini.logout:active{ background:#c62828; }
.btn-mini.logout:focus-visible{ outline:2px solid #ffeb3b; outline-offset:2px; }
