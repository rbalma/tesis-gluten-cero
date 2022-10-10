import { useState } from "react";
import { Form, Input, Select, Button, Upload, message, Col } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import styles from './MapForm.module.css';
import "leaflet/dist/leaflet.css"; 
import { LocationMarket } from "./LocationMarket";
// import { addMarketApi } from "../../api/map";
// import { getAccessTokenApi } from "../../api/auth";

const GEOCODE_URL =
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=TR&location=";

const ubicacion = {
  lat: -31.41718428534527,
  lng: -64.18382740831277,
}

export const MapForm = () => {
  const [form] = Form.useForm();
  const [map, setMap] = useState(null)
  const [foto, setFoto] = useState({});

  const buscarDireccion = (value) => {
    if (value.length > 8) {
      // Utilizar el provider
      const provider = new OpenStreetMapProvider();
      provider.search({ query: value.trim() }).then(async (resultado) => {
        if (resultado[0]?.bounds[0]) {
          handleSetView(resultado[0].bounds[0], resultado[0].label);
          const coordinates = resultado[0].bounds[0];
          const data = await (
            await fetch(GEOCODE_URL + `${coordinates[1]},${coordinates[0]}`)
          ).json();
          form.setFieldsValue({
              direction: data.address.Address,
              city: data.address.City,
              country: data.address.CountryCode,
              longitude: data.location.y,
              latitude: data.location.x,
          });
        }
      });
    }
  };

  const handleSetView = (cordenadas, nombre) => {
    //setLugar(nombre);
    map.setView(cordenadas, 18);
  };

  const handleSubmit = (values) => {
    const file= foto[0].originFileObj;
    console.log(file);
    const accessToken = getAccessTokenApi();
    addMarketApi(accessToken, values, file).then( res =>{
      if(res.ok) return message.success('marcador creado');
      return message.error(res.message);
    }).catch(err => console.error(err.message))
  };

  return (
     <div className={styles.mapaContenedor}>
      <div className={styles.mapaFormulario}>
        <h3 className={styles.mapaTitulo}>Agrega un Nuevo Marcador al Mapa</h3>

        <Form
          {...formItemLayout}
          name="market-form"
          form={form}
          onFinish={handleSubmit}
          validateMessages={validateMessages}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Tipo"
            rules={[{ required: true }]}
          >
            <Select style={{ width: "150px" }}>
              <Select.Option value={0}>Comercio</Select.Option>
              <Select.Option value={1}>Restaurante</Select.Option>
              <Select.Option value={2}>Centro de Salud</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="phone" label="Telefono">
            <Input type='number' />
          </Form.Item>

          {/* UPLOAD FOTO */}
          <Form.Item label="Foto" tooltip="Formato png, jpeg, jpg. Tamaño máximo 1 mb">
            <ImgCrop aspect={16/9} beforeCrop={beforeUpload} modalTitle="Subir Imagen" >
            <Upload
              name="picture"
              accept=".png, .jpeg, .jpg"
              listType="picture"
              maxCount={1}
              onPreview={onPreview}
              customRequest={ ({ file, onSuccess }) => onSuccess("ok")}
              onChange={ ({ fileList }) => setFoto( fileList )}
            >
              <Button icon={<UploadOutlined />}>Subir una imagen</Button>
            </Upload>
            </ImgCrop>
          </Form.Item>


          <label>Ingresa calle, número, barrio y provincia de la ubicación: </label>
          <Input.Search style={{ marginBottom: "10px" }} enterButton="Ir" onSearch={buscarDireccion} />


          {/* MAPA */}
          <small>
            Mueve el Pin hacia el punto exacto en caso de ser necesario
          </small>
          <div className={styles.mapaUbicacion}>
            <MapContainer
              center={ubicacion}
              zoom={12}
              scrollWheelZoom={false}
              style={{ minHeight: '100%', minWidth: '100%', zIndex: 1 }}
              ref={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarket form={form} />
            </MapContainer>
          </div>

          <div className="mapa__texto">
            Confirma que los siguientes campos sean correctos:
          </div>
          <Form.Item
            name="direction"
            label="Dirección"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="city"
            label="Ciudad"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="País"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="latitude"
            label="Latitud"
            rules={[{ required: true }]}
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            name="longitude"
            label="Longitud"
            rules={[{ required: true }]}
          >
            <Input readOnly />
          </Form.Item>

          <Form.Item
            wrapperCol={{ ...tailFormItemLayout.wrapperCol, offset: 8 }}
          >
            <Button block type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 6,
      offset: 18,
    },
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Ingresa un ${label}",
  types: {
    number: "${label} no es un número válido",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-disable no-template-curly-in-string */



// * Cortar imagen subida por el usuario
const beforeUpload = (file) => {
  const isJPGPNG = file.type === "image/jpeg" || file.type === "image/png" ;
  if (!isJPGPNG) {
    message.error("Solo puedes subir una imagen en jpg o png");
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error('La imagen debe ser menor a 1MB!');
    return false;
  }
  return true;
};

const onPreview = async file => {
  let src = file.url;
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow.document.write(image.outerHTML);
};