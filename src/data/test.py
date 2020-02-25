import json
with open('./42_trade_embedding.json', 'r') as f:
    e = json.load(f)

min_x = 1
max_x = -1
min_y = 1
max_y = -1
out = {}
# for key in e:
#     out[key] = {}
#     out[key]["pca"] = e[key]["pca"]

# with open('./42_trade_embedding_lite.json', 'w') as f:
#     json.dump(out,f,indent=2)

for key in e:
    out[key] = {}
    pca = e[key]["pca"]
    if pca[0] < min_x:
        min_x = pca[0] 
    if pca[0] > max_x:
        max_x = pca[0] 
    if pca[1] < min_y:
        min_y = pca[1] 
    if pca[1] > max_y:
        max_y = pca[1] 
print(min_x, min_y, max_x, max_y)