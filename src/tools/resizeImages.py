import os
from PIL import Image 
from os.path import dirname

import_dir = './src/assets/dist'
output_dir = './src/assets/dist_temp'
 
img_count = 0
file_count = 0
resize_count = 0
existing_count = 0

#minimum size required for resize
MIN_WIDTH = 512
MIN_HEIGHT = 512
# If image does not meet size requirements should it still save the new filename
SAVE_ALL = True
# scale of resized image compared to original image
SCALE = 0.5
#resize the image again if the resized filename already exists
OVERWRITE = True
#string appended to end of resized filename before the extention
MODIFIER_STRING = '_sm'


def get_new_name(filepath, mod):
	fileName, fileExtension = os.path.splitext(filepath)
	return '%s%s'%(fileName, fileExtension)
 
def resize_image(filepath, filedest):
	global resize_count
	global existing_count
	global MIN_WIDTH
	global MIN_HEIGHT
	global OVERWRITE
	global SCALE
	global SAVE_ALL

	if not os.path.isfile(filedest) or OVERWRITE: 
		print 'Resizing: \n%s ---> %s'%(filepath, filedest)
		status = "incomplete"
		im = Image.open(filepath)
		(width, height) = im.size
		
		if not os.path.exists(os.path.dirname(filedest)):
			os.makedirs(os.path.dirname(filedest))

		if(width < MIN_WIDTH and height < MIN_HEIGHT):
			status = 'Image to small'
			existing_count += 1
			if SAVE_ALL:
				im.save(filedest)
		else:
			status = 'Success'
			size = MIN_WIDTH, MIN_HEIGHT
			im.thumbnail(size, Image.ANTIALIAS)
			im.save(filedest)
			resize_count += 1

		print 'Status: %s\n'%(status)
	else:
		existing_count += 1
 
# loop througs files in import_dir recursively 
for subdir, dirs, files in os.walk(import_dir):
    for file in files:
    	filepath = os.path.join(subdir, file)
    	fileName, fileExtension = os.path.splitext(file)
    	file_count += 1
    	if(fileExtension == '.png') or (fileExtension == '.jpg'):
    		img_count += 1
    		if(MODIFIER_STRING not in fileName):
    			filedest = get_new_name(filepath.replace(import_dir, output_dir), MODIFIER_STRING)
    			resize_image(filepath, filedest)

 
print '================'
print 'TASK: COMPLETE'
print 'Total Files Found: %s'%(file_count)
print 'Total Images Found: %s'%(img_count)
print 'Images Resized: %s'%(resize_count)
print 'Images Skipped: %s'%(existing_count)