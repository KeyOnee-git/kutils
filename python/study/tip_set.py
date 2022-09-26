# 세트 : {} 로 선언
# - 순서 X
# - 중복 X

A_like = { '돈까스', '보쌈', '제육덮밥' }
B_like = {'짬뽕', '초밥', '제육덮밥'}
C_like = {'초밥', '초밥', '초밥'} # 중복은 허용 안하므로 {'초밥'} 이 됨.

print(f'# A_like:{A_like}')
print(f'# B_like:{B_like}')
print(f'# C_like:{C_like}')

# 교집합 : intersection
print('# A_like.intersection(B_like):', A_like.intersection(B_like)) # 교집합 : { 제육덮밥 }

# 합집합 : union
print('# A_like.union(B_like):', A_like.union(B_like)) # 합집합 : 순서는 보장안하므로 매번 다를수 있음!! {'제육덮밥', '보쌈', '돈까스', '짬뽕', '초밥'}

# 차집합 : difference
print('# A_like.difference(B_like):', A_like.difference(B_like)) # 차집합 : 순서는 보장안하므로 매번 다를수 있음!! {'돈까스', '보쌈'}

###########################################

# 추가 : add
A_like.add('우동')
print("# A_like.add('우동'):", A_like)

# 삭제 : remove
A_like.remove('우동')
print("# A_like.remove('우동'):", A_like)

# 비우기: clear
A_like.clear()
print('#A_like.clear():', A_like)

# 기타 메소드
# copy() : 세트 복사
# discard() : 값 삭제 (해당 값이 없어도 에러발생X)
# isdisjoint() : 두 세트에 겹치는 값이 없는지 여부
# issubset() : 다른 세트의 부분집합인지 여부
# issuperset() : 다른 세트의 상위집한인지 여부
# update() : 다른세트의 값들을 더함 == aka. union한 결과를 자기 자신에 저장
U_SET = {'오삼불고기', '회덮밥', '제육덮밥'}
B_like.update(U_SET) 
print(B_like)