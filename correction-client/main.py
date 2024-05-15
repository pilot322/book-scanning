import image_processing as img_proc
import os

id = 0
CORRECTION_CLIENT_KEY='SKPrfebgb87rhfw7argb7bwa78rw78rf08q2gf9626fhf3r9hhjs92qwdjla74h5g9q6'

SENT_ONCE=False

def send_request(barcodes):
    global SENT_ONCE
    if SENT_ONCE:
        return None
    
    SENT_ONCE=True

    response = {
        "data": {
            "barcode": "2-274-01-00001"
        }
    }
    return response

def check_for_errors(barcode):
    print(f'checking for errors for book {barcode}')

    img_proc.analyze_folder(os.getcwd() + '\\books\\' + barcode)

def send_errors(errors):
    pass

def login():
    pass

def get_available_barcodes():
    return []

def main():
    login()
    # todo: read barcodes from directory. may change.
    barcodes = get_available_barcodes()
    while True:
        # sends the 
        response = send_request(barcodes)

        if response is None:
            break

        barcode = response['data']['barcode']
        
        if barcode is None:
            break

        errors = check_for_errors(barcode)

        send_errors(errors)
    
    print("Finished")
    # input("Press any key to exit")


main()