# 반복문 for. TAB으로 지정
# for 변수 in 반복범위 or 대상:
#   반복 수행 문장


# range() 함수: range(start_include, end_exclude, inc)
print(range(10))


### range활용
# EX_1)
for x in range(10):
    print(f'{x} 반복')

    
# EX_2)
for x in range(10, 21):
    print(f'{x} 10~20 사이 반복')

# EX_3)
for x in range(1, 10, 2):
    print(f'{x} 1이상 10미만 2씩 증가하며')


# EX_4)
for x in range(10, 0, -2):
    print(f'{x} ')

# LIST, TUPLE, DICTIONARY를 활용하여 순회 가능

li = [1221, 1218, 1214, 1212]
print(li)

for i in li:
    print(i)