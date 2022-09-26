# 튜플 () 로 선언
# 튜플 == "수정 불가" '리스트' == 읽기전용 리스트
myTuple = (3.14, 1, 'A', True, False)
print('# myTuple:', myTuple)
print(type(myTuple))

# 따라서 LIST에는 있는 변경하는 메소드는 존재하지 않음. 그냥 이렇게 읽기 전용
print(myTuple[2])
print(myTuple[3:])
print(myTuple[1:4])
print(myTuple.count(1))
print(myTuple.index(3.14))
print('A' in myTuple)

# 패킹 vs 언패킹

myTuple2 = (3.14, 1, 'A', True, False, 'xyz') # 패킹
(v0, v1, v2, v3, v4, v5) = myTuple2 # 언패킹
#(rv0, rv1, rv2) = myTuple2 # 언패킹 : ValueError: too many values to unpack (expected 3)
(rv0, rv1, *rvs0) = myTuple2 # 언패킹 : rv0: 3.14, rv1: 1, rvs0: ['A', True, False, 'xyz'] # 맨뒤
(*rvs1, erv0, erv1) = myTuple2 # 언패킹 : rvs1: [3.14, 1, 'A', True], erv0: False, erv1: 'xyz' # 맨앞
(rv0s, rv1s,*rvs2, rv0e) = myTuple2 # 언패킹 : rv0s: 3.14, rv1s: 1, rvs0: ['A', True, False], rv0e: xyz # 중간

print(f'myTuple2({myTuple2})')
print(f'v0({v0}) v1({v1}) v2({v2}) v3({v3}) v4({v4})')
print(f'rv0({rv0}) rv1({rv1}) rvs0({rvs0})')
print(f'rvs1({rvs1}) erv0({erv0}) erv1({erv1})')
print(f'rv0s({rv0s}) rv1s({rv1s}) rvs0({rvs2}) rv0e({rv0e})')

# [팁]
# - tuple <-> list는 강제 형변환으로 서로 대입이 가능하다!!
  