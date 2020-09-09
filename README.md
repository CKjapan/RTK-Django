# 流れ

<br>
<br>

## 起動

<br>

1. clone this repository
2. `$ docker-compose up`
<br>
<br>

---

---
<br>
<br>

## Select

<br>

1. createSlice で slice の作成
2. store への slice の登録
3. component に useSelector の記載
 <br>
 <br>

---

### createSlice で slice の作成

<br>
   slice 名、initialState、reducers、(非同期がある場合は extraReducers)を定義
<br>
<br>

---

### store への slice の登録

<br>
   1 で export した slice を sore へ登録
<br>
<br>

---

### component に useSelector の記載

<br>
   1 で export した state 参照関数を useSelector でラップして実行
<br>
<br>

---

---
<br>
<br>

## Action

<br>

1. createSlice で slice の作成
2. store への slice の登録
3. component に dispatch の記載
<br>
<br>

---

### createSliceで sliceの作成

<br>
   slice 名、initialState、reducers、(非同期がある場合は extraReducers)を定義
<br>
<br>

---

### store へのslice の登録

<br>
   1 で export した slice を sore へ登録
<br>
<br>

---

### component に dispatch の記載

<br>
   1 で export した actionCreator を dispatch でラップして実行

---

---
<br>
<br>

## Img

<br>

![reduxToolKit2](https://user-images.githubusercontent.com/56463277/92553106-20111880-f29d-11ea-9e5e-5d5e8c25e29a.png)

<br>

---

---
<br>
<br>

## (注)sliceのreducer

<br>

```javascript
reducers: {
    setName: (state, action) => {
      state.username = action.payload;
    },
    clearName: state => {
    state.username = ""; })
    },
```

<br>

>reducerは<br>
(state, action) => {state.username = action.payload;}<br>
state => {state.username = "";})}<br>
の部分<br>
更新前state,とaction(Payload)を受け取ってstateを更新

<br>

>setName、clearNameはActionCreator<br>
sliceからexportしてcomponentからdispatchを通して実行。reducerにactionpayloadを渡す。
